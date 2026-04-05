import { neon } from '@neondatabase/serverless'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const secret = url.searchParams.get('secret')

  if (secret !== 'CROP-ADMIN-2026-IKE') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sql = neon(process.env.DATABASE_URL!)

  try {
    // Create enums using DO blocks (Postgres syntax for IF NOT EXISTS on types)
    await sql`DO $$ BEGIN
      CREATE TYPE plan AS ENUM ('free', 'starter', 'professional', 'enterprise');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$`

    await sql`DO $$ BEGIN
      CREATE TYPE status AS ENUM ('active', 'inactive', 'suspended');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$`

    // Users table
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

    // Opportunities table
    await sql`CREATE TABLE IF NOT EXISTS opportunities (
      id TEXT PRIMARY KEY,
      solicitation_number TEXT,
      title TEXT NOT NULL,
      agency TEXT,
      naics_code TEXT,
      posted_date TIMESTAMP,
      response_deadline TIMESTAMP,
      place_of_performance TEXT,
      contract_type TEXT,
      estimated_value INTEGER,
      description TEXT,
      sam_gov_link TEXT,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`

    // Vendor alerts table
    await sql`CREATE TABLE IF NOT EXISTS vendor_alerts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
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

    // Alert matches table
    await sql`CREATE TABLE IF NOT EXISTS alert_matches (
      id TEXT PRIMARY KEY,
      alert_id TEXT NOT NULL REFERENCES vendor_alerts(id),
      opportunity_id TEXT NOT NULL REFERENCES opportunities(id),
      sent_at TIMESTAMP DEFAULT NOW(),
      delivery_status TEXT DEFAULT 'pending'
    )`

    // Indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_opp_naics ON opportunities(naics_code)`
    await sql`CREATE INDEX IF NOT EXISTS idx_opp_posted ON opportunities(posted_date DESC)`
    await sql`CREATE INDEX IF NOT EXISTS idx_alert_user ON vendor_alerts(user_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_match_alert ON alert_matches(alert_id)`

    return Response.json({
      ok: true,
      message: 'Schema initialized',
      tables: ['users', 'opportunities', 'vendor_alerts', 'alert_matches'],
      ts: new Date().toISOString()
    })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    return Response.json({ ok: false, error: msg }, { status: 500 })
  }
}
