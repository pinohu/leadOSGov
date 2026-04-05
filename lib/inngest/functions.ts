import { inngest } from '.'
import { db } from '@/lib/db'
import { opportunities, vendorAlerts, alertMatches, users } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export const scanOpportunities = inngest.createFunction(
  { id: 'scan-opportunities', name: 'Scan SAM.gov Opportunities' },
  { cron: '0 */4 * * *' }, // every 4 hours
  async ({ step }) => {
    const apiKey = process.env.SAM_API_KEY
    if (!apiKey) throw new Error('SAM_API_KEY not configured')

    const data = await step.run('fetch-sam-gov', async () => {
      const url = `https://api.sam.gov/opportunities/v2/search?api_key=${apiKey}&limit=50&postedFrom=${getYesterday()}&ptype=o`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`SAM.gov API error: ${res.status}`)
      return res.json()
    })

    const count = await step.run('upsert-opportunities', async () => {
      const opps = data?.opportunitiesData || []
      let inserted = 0
      for (const opp of opps) {
        await db.insert(opportunities).values({
          id: opp.noticeId || opp.id,
          solicitationNumber: opp.solicitationNumber,
          title: opp.title,
          agency: opp.department?.name || opp.organizationHierarchy?.[0]?.name,
          naicsCode: opp.naicsCode,
          postedDate: opp.postedDate ? new Date(opp.postedDate) : null,
          responseDeadline: opp.responseDeadLine ? new Date(opp.responseDeadLine) : null,
          description: opp.description,
          samGovLink: `https://sam.gov/opp/${opp.noticeId}/view`,
        }).onConflictDoNothing()
        inserted++
      }
      return inserted
    })

    await step.sendEvent('match-alerts', { name: 'opportunity.scan.complete', data: { count } })
    return { scanned: count }
  }
)

export const sendAlertNotifications = inngest.createFunction(
  { id: 'send-alert-notifications', name: 'Match and Send Alert Notifications' },
  { event: 'opportunity.scan.complete' },
  async ({ step }) => {
    const alerts = await step.run('get-active-alerts', async () => {
      return db.select().from(vendorAlerts).where(eq(vendorAlerts.isActive, true))
    })

    return { processed: alerts.length }
  }
)

function getYesterday() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}
