import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  return (
    <div className="min-h-screen">
      {/* Dash nav */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#C9A84C] rounded-lg flex items-center justify-center text-[#0A0B1A] font-bold text-sm">L</div>
          <span className="font-semibold text-white">LeadOS <span className="text-[#C9A84C]">Gov</span></span>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <Link href="/dashboard/alerts" className="hover:text-white">Alerts</Link>
          <Link href="/dashboard/opportunities" className="hover:text-white">Opportunities</Link>
          <Link href="/dashboard/settings" className="hover:text-white">Settings</Link>
          <Link href="/sign-out" className="text-white/40 hover:text-white">Sign out</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user.firstName || 'there'} 👋
          </h1>
          <p className="text-white/50 mt-1">Your government opportunity intelligence dashboard</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active alerts', value: '0', action: 'Set up first alert →', href: '/dashboard/alerts/new' },
            { label: 'New opportunities', value: '0', action: 'Browse →', href: '/dashboard/opportunities' },
            { label: 'Matches this week', value: '0', action: 'View →', href: '/dashboard/opportunities' },
            { label: 'Your plan', value: 'Free', action: 'Upgrade →', href: '/pricing' },
          ].map(s => (
            <div key={s.label} className="card">
              <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs text-white/40 mb-3">{s.label}</div>
              <Link href={s.href} className="text-xs text-[#C9A84C] hover:underline">{s.action}</Link>
            </div>
          ))}
        </div>

        {/* Setup prompt */}
        <div className="card border-[#C9A84C]/20 bg-[#C9A84C]/5">
          <h2 className="text-lg font-semibold text-white mb-2">🚀 Set up your first alert</h2>
          <p className="text-white/50 text-sm mb-4">Tell us your NAICS codes, keywords, and agencies — we'll watch SAM.gov and notify you instantly when matching opportunities post.</p>
          <Link href="/dashboard/alerts/new" className="btn-primary inline-block text-sm py-2 px-5">
            Create alert →
          </Link>
        </div>
      </main>
    </div>
  )
}
