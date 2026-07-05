import { useState } from 'react'
import { AppStoreProvider } from '@/lib/store'
import { EcommerceWebsite } from '@/components/EcommerceWebsite'
import { SupportDashboard } from '@/components/SupportDashboard'
import { DemoBanner } from '@/components/DemoBanner'

function AppContent() {
  const [view, setView] = useState<'public' | 'admin'>('public')
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <DemoBanner view={view} onViewChange={setView} />
      {view === 'public' ? <EcommerceWebsite /> : <SupportDashboard />}
    </div>
  )
}

export default function App() {
  return (
    <AppStoreProvider>
      <AppContent />
    </AppStoreProvider>
  )
}
