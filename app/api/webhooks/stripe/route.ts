import Stripe from 'stripe'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return new Response('Invalid signature', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    // Stripe v17: Stripe.Checkout.Session (not Stripe.CheckoutSession)
    const session = event.data.object as Stripe.Checkout.Session
    const customerId = session.customer as string
    const subscriptionId = session.subscription as string
    const customerEmail = session.customer_details?.email

    if (customerEmail) {
      await db.update(users)
        .set({
          plan: 'starter',
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          updatedAt: new Date(),
        })
        .where(eq(users.email, customerEmail))
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    await db.update(users)
      .set({ plan: 'free', updatedAt: new Date() })
      .where(eq(users.stripeSubscriptionId, sub.id))
  }

  return new Response('OK', { status: 200 })
}
