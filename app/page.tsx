import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#C9A84C] rounded-lg flex items-center justify-center text-[#0A0B1A] font-bold text-sm">L</div>
          <span className="font-semibold text-white">LeadOS <span className="text-[#C9A84C]">Gov</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/pricing" className="text-sm text-white/60 hover:text-white">Pricing</Link>
          <SignedOut>
            <Link href="/sign-in" className="btn-secondary text-sm py-2">Sign in</Link>
            <Link href="/sign-up" className="btn-primary text-sm py-2">Get started</Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="btn-primary text-sm py-2">Dashboard →</Link>
          </SignedIn>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-[#C9A84C] rounded-full animate-pulse"></span>
          <span className="text-[#C9A84C] text-sm font-medium">Live SAM.gov monitoring — updated every 4 hours</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          Never miss a<br /><span className="text-[#C9A84C]">government contract</span>
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
          AI monitors SAM.gov, USASpending, and 12 federal procurement portals. Get instant SMS and email alerts when matching opportunities post — before your competitors see them.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/sign-up" className="btn-primary text-base px-8 py-4">
            Start monitoring free →
          </Link>
          <Link href="/pricing" className="btn-secondary text-base px-8 py-4">
            View pricing
          </Link>
        </div>
        <p className="text-white/40 text-sm mt-6">No credit card required · 14-day free trial · Cancel anytime</p>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Opportunities monitored', value: '847K+' },
            { label: 'Federal agencies', value: '430+' },
            { label: 'NAICS codes tracked', value: '1,057' },
            { label: 'Avg alert speed', value: '< 4hrs' },
          ].map(stat => (
            <div key={stat.label} className="card text-center">
              <div className="text-3xl font-bold text-[#C9A84C] mb-1">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Everything you need to win federal contracts</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Smart Matching', desc: 'Set NAICS codes, keywords, agencies, and dollar thresholds. Get only opportunities that fit your capabilities.', icon: '🎯' },
            { title: 'Instant Alerts', desc: 'SMS and email the moment a matching opportunity posts — hours before most contractors even check SAM.gov.', icon: '⚡' },
            { title: 'Opportunity Intelligence', desc: 'AI summarizes each opportunity, flags key requirements, and scores your likelihood of winning.', icon: '🧠' },
            { title: 'SAM.gov Integration', desc: 'Direct API connection to SAM.gov, beta.SAM.gov, USASpending, and 10+ procurement portals.', icon: '🔗' },
            { title: 'Team Workspace', desc: 'Share alerts with your BD team. Assign opportunities, track pursuit status, and manage pipelines.', icon: '👥' },
            { title: 'Compliance Tracking', desc: 'Monitor registration expiry, set-aside requirements, and past performance submission deadlines.', icon: '✅' },
          ].map(f => (
            <div key={f.title} className="card">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-white/30 text-sm">
        © {new Date().getFullYear()} Dynasty Empire LLC · LeadOS Gov · sitbid.com
      </footer>
    </main>
  )
}
