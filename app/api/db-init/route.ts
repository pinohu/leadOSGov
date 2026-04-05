import { neon } from '@neondatabase/serverless'

export async function GET(req: Request) {
  const url = new URL(req.url)
  if (url.searchParams.get('secret') !== 'CROP-ADMIN-2026-IKE') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sql = neon(process.env.DATABASE_URL!)
  const log: string[] = []
  const safe = async (label: string, fn: () => Promise<unknown>) => {
    try { await fn(); log.push(label + ' ok') }
    catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      if (msg.includes('already exists') || msg.includes('duplicate')) { log.push(label + ' exists') }
      else { log.push(label + ' ERROR: ' + msg.substring(0, 60)) }
    }
  }

  await safe('plan enum',   () => sql`DO $$ BEGIN CREATE TYPE plan AS ENUM ('free','starter','professional','enterprise'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`)
  await safe('status enum', () => sql`DO $$ BEGIN CREATE TYPE status AS ENUM ('active','inactive','suspended'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`)

  await safe('users table', () => sql`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE,
    first_name TEXT, last_name TEXT, organization_name TEXT,
    plan plan NOT NULL DEFAULT 'free',
    stripe_customer_id TEXT, stripe_subscription_id TEXT,
    status status NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`)

  await safe('opportunities table', () => sql`CREATE TABLE IF NOT EXISTS opportunities (
    id TEXT PRIMARY KEY, title TEXT NOT NULL, created_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`)

  // Add columns one by one — safe if already exists
  await safe('opp.solicitation_number', () => sql`ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS solicitation_number TEXT`)
  await safe('opp.agency',              () => sql`ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS agency TEXT`)
  await safe('opp.naics_code',          () => sql`ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS naics_code TEXT`)
  await safe('opp.posted_date',         () => sql`ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS posted_date TIMESTAMP`)
  await safe('opp.response_deadline',   () => sql`ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS response_deadline TIMESTAMP`)
  await safe('opp.place_of_performance',() => sql`ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS place_of_performance TEXT`)
  await safe('opp.contract_type',       () => sql`ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS contract_type TEXT`)
  await safe('opp.estimated_value',     () => sql`ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS estimated_value INTEGER`)
  await safe('opp.description',         () => sql`ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS description TEXT`)
  await safe('opp.sam_gov_link',        () => sql`ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS sam_gov_link TEXT`)
  await safe('opp.is_active',           () => sql`ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE`)

  await safe('vendor_alerts table', () => sql`CREATE TABLE IF NOT EXISTS vendor_alerts (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL,
    naics_codes TEXT[], keywords TEXT[], agencies TEXT[],
    min_value INTEGER, max_value INTEGER,
    email_alerts BOOLEAN DEFAULT TRUE, sms_alerts BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE, created_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`)

  await safe('alert_matches table', () => sql`CREATE TABLE IF NOT EXISTS alert_matches (
    id TEXT PRIMARY KEY, alert_id TEXT NOT NULL, opportunity_id TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT NOW(), delivery_status TEXT DEFAULT 'pending'
  )`)

  await safe('idx_opp_naics',  () => sql`CREATE INDEX IF NOT EXISTS idx_opp_naics  ON opportunities(naics_code)`)
  await safe('idx_opp_posted', () => sql`CREATE INDEX IF NOT EXISTS idx_opp_posted ON opportunities(posted_date DESC)`)
  await safe('idx_alert_user', () => sql`CREATE INDEX IF NOT EXISTS idx_alert_user ON vendor_alerts(user_id)`)
  await safe('idx_match_alert',() => sql`CREATE INDEX IF NOT EXISTS idx_match_alert ON alert_matches(alert_id)`)

  const errors = log.filter(l => l.includes('ERROR'))
  return Response.json({
    ok: errors.length === 0,
    message: errors.length === 0 ? 'Schema ready' : 'Completed with errors',
    log,
    ts: new Date().toISOString()
  })
}
