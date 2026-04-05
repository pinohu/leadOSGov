import Link from 'next/link'

const plans = [
  {
    name: 'Starter', price: '$97', period: '/mo', highlight: false,
    features: ['50 alert matches/mo', '5 saved alerts', 'Email notifications', 'SAM.gov integration', '2 users'],
    cta: 'Start free trial', href: '/sign-up'
  },
  {
    name: 'Professional', price: '$297', period: '/mo', highlight: true,
    features: ['Unlimited alert matches', 'Unlimited saved alerts', 'SMS + Email alerts', 'All 12 portals', 'API access', 'Unlimited users', 'Priority support'],
    cta: 'Start free trial', href: '/sign-up'
  },
  {
    name: 'Enterprise', price: 'Custom', period: '', highlight: false,
    features: ['Everything in Pro', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'Procurement consulting'],
    cta: 'Contact sales', href: 'mailto:sales@sitbid.com'
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <nav className="border-b border-white/10 px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3 w-fit">
          <div className="w-8 h-8 bg-[#C9A84C] rounded-lg flex items-center justify-center text-[#0A0B1A] font-bold text-sm">L</div>
          <span className="font-semibold text-white">LeadOS <span className="text-[#C9A84C]">Gov</span></span>
        </Link>
      </nav>
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Simple, transparent pricing</h1>
        <p className="text-white/50 mb-12">14-day free trial on all plans. No credit card required.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.name} className={`card flex flex-col text-left ${plan.highlight ? 'border-[#C9A84C]/50 bg-[#C9A84C]/5' : ''}`}>
              {plan.highlight && <div className="text-xs text-[#C9A84C] font-semibold mb-3 uppercase tracking-wider">Most popular</div>}
              <div className="text-lg font-semibold text-white mb-1">{plan.name}</div>
              <div className="text-4xl font-bold text-white mb-1">{plan.price}<span className="text-lg text-white/40 font-normal">{plan.period}</span></div>
              <div className="border-t border-white/10 my-6"></div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-[#C9A84C] mt-0.5 flex-shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href={plan.href} className={`text-center py-3 rounded-lg font-semibold text-sm transition-all ${plan.highlight ? 'bg-[#C9A84C] text-[#0A0B1A] hover:opacity-90' : 'border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10'}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
