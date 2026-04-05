import { neon } from '@neondatabase/serverless'

export async function GET(req: Request) {
  const url = new URL(req.url)
  if (url.searchParams.get('secret') !== 'CROP-ADMIN-2026-IKE') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sql = neon(process.env.DATABASE_URL!)
  const log: string[] = []

  try {
    // Enums
    await sql`DO $$ BEGIN CREATE TYPE plan AS ENUM ('free','starter','professional','enterprise'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`
    await sql`DO $$ BEGIN CREATE TYPE status AS ENUM ('active','inactive','suspended'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`
    log.push('enums ok')

    // Users
    await sql`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      first_name TEXT,
      last_name TEXT,
      organization_name TEXT,
      plan plan NOT NULL DEFAULT 'free',
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT,
      status status NOT NULL DEFAULT 'active',
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`
    log.push('users ok')

    // Opportunities — create then add columns if missing
    await sql`CREATE TABLE IF NOT EXISTS opportunities (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`
    const oppCols = [
      "solicitation_number TEXT",
      "agency TEXT",
      "naics_code TEXT",
      "posted_date TIMESTAMP",
      "response_deadline TIMESTAMP",
      "place_of_performance TEXT",
      "contract_type TEXT",
      "estimated_value INTEGER",
      "description TEXT",
      "sam_gov_link TEXT",
      "is_active BOOLEAN DEFAULT TRUE"
    ]
    for (const col of oppCols) {
      const colName = col.split(' ')[0]
      try {
        await sql(\`ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS \${colName} \${col.split(' ').slice(1).join(' ')}\`)
      } catch {}
    }
    log.push('opportunities ok')

    // Vendor alerts
    await sql`CREATE TABLE IF NOT EXISTS vendor_alerts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      naics_codes TEXT[],
      keywords TEXT[],
      agencies TEXT[],
      min_value INTEGER,
      max_value INTEGER,
      email_alerts BOOLEAN DEFAULT TRUE,
      sms_alerts BOOLEAN DEFAULT FALSE,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`
    log.push('vendor_alerts ok')

    // Alert matches
    await sql`CREATE TABLE IF NOT EXISTS alert_matches (
      id TEXT PRIMARY KEY,
      alert_id TEXT NOT NULL,
      opportunity_id TEXT NOT NULL,
      sent_at TIMESTAMP DEFAULT NOW(),
      delivery_status TEXT DEFAULT 'pending'
    )`
    log.push('alert_matches ok')

    // Indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_opp_naics ON opportunities(naics_code)`
    await sql`CREATE INDEX IF NOT EXISTS idx_opp_posted ON opportunities(posted_date DESC)`
    await sql`CREATE INDEX IF NOT EXISTS idx_alert_user ON vendor_alerts(user_id)`
    log.push('indexes ok')

    return Response.json({ ok: true, message: 'Schema ready', log, ts: new Date().toISOString() })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return Response.json({ ok: false, error: msg, log }, { status: 500 })
  }
}
