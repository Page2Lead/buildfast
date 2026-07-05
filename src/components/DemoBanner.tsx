import { AlertCircle, Eye, Settings } from 'lucide-react'

export function DemoBanner({ view, onViewChange }: { view: string; onViewChange: (v: any) => void }) {
  return (
    <div className="sticky top-0 z-50 bg-amber-600 text-white px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-medium">BuildFast — AI Customer Support Ticket System</span>
        </div>
        <div className="flex items-center gap-3">
          {['public', 'admin'].map((v) => (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                view === v
                  ? 'bg-white text-amber-600'
                  : 'bg-amber-700 hover:bg-amber-500'
              }`}
            >
              {v === 'public' ? <Eye className="w-4 h-4 inline mr-1" /> : <Settings className="w-4 h-4 inline mr-1" />}
              {v === 'public' ? 'Public' : 'Admin'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
