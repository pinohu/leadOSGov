import { pgTable, text, timestamp, boolean, integer, varchar, pgEnum } from 'drizzle-orm/pg-core'

export const planEnum = pgEnum('plan', ['free', 'starter', 'professional', 'enterprise'])
export const statusEnum = pgEnum('status', ['active', 'inactive', 'suspended'])

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Clerk user ID
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  organizationName: text('organization_name'),
  plan: planEnum('plan').default('free').notNull(),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  status: statusEnum('status').default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const opportunities = pgTable('opportunities', {
  id: text('id').primaryKey(),
  solicitationNumber: text('solicitation_number'),
  title: text('title').notNull(),
  agency: text('agency'),
  naicsCode: text('naics_code'),
  postedDate: timestamp('posted_date'),
  responseDeadline: timestamp('response_deadline'),
  placeOfPerformance: text('place_of_performance'),
  contractType: text('contract_type'),
  estimatedValue: integer('estimated_value'),
  description: text('description'),
  samGovLink: text('sam_gov_link'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const vendorAlerts = pgTable('vendor_alerts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  naicsCodes: text('naics_codes').array(),
  keywords: text('keywords').array(),
  agencies: text('agencies').array(),
  minValue: integer('min_value'),
  maxValue: integer('max_value'),
  emailAlerts: boolean('email_alerts').default(true),
  smsAlerts: boolean('sms_alerts').default(false),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const alertMatches = pgTable('alert_matches', {
  id: text('id').primaryKey(),
  alertId: text('alert_id').notNull().references(() => vendorAlerts.id),
  opportunityId: text('opportunity_id').notNull().references(() => opportunities.id),
  sentAt: timestamp('sent_at').defaultNow(),
  deliveryStatus: text('delivery_status').default('pending'),
})
