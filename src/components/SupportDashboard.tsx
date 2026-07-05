import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle2, Clock, Zap } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useState } from 'react'

export function SupportDashboard() {
  const { tickets, updateTicketStatus, getStats } = useAppStore()
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const stats = getStats()

  const aiSuggestions: Record<string, string> = {
    order: 'Order status: In processing. Expected delivery in 2-3 business days.',
    shipping: 'Shipping delays are common in monsoon. Track: TRK123456',
    returns: 'Returns accepted within 30 days. Free return shipping available.',
    payment: 'Contact payment provider. We can reprocess if needed.',
    product: 'Product specs available on product page. Compatible with most devices.',
    other: 'Thank you for reaching out. A human agent will respond shortly.',
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Support Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Tickets', value: stats.totalTickets, icon: AlertCircle, color: 'text-blue-600' },
            { label: 'AI Resolved', value: stats.aiResolved, icon: CheckCircle2, color: 'text-green-600' },
            { label: 'Escalated', value: stats.escalated, icon: Clock, color: 'text-orange-600' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className={`p-6 rounded-lg bg-white border border-slate-200 ${stat.color}`}>
                <Icon className="w-8 h-8 mb-2" />
                <p className="text-slate-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Tickets */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Subject</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {tickets.map((ticket) => (
                    <motion.tr
                      key={ticket.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-medium">{ticket.customerName}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{ticket.subject}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-amber-50 text-amber-700 text-xs font-medium capitalize">
                          {ticket.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={ticket.status}
                          onChange={(e) => updateTicketStatus(ticket.id, e.target.value as any)}
                          className="text-sm px-2 py-1 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="open">Open</option>
                          <option value="ai-resolved">AI Resolved</option>
                          <option value="escalated">Escalated</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                        >
                          View
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-4">Ticket #{selectedTicket.id}</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600">Customer</p>
                  <p className="font-medium">{selectedTicket.customerName} ({selectedTicket.email})</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Subject</p>
                  <p className="font-medium">{selectedTicket.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Message</p>
                  <p className="font-medium">{selectedTicket.message}</p>
                </div>
                {selectedTicket.aiResolution && (
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex gap-2 mb-2">
                      <Zap className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <p className="text-sm font-semibold text-green-900">AI Response</p>
                    </div>
                    <p className="text-sm text-green-800">{selectedTicket.aiResolution}</p>
                  </div>
                )}
                {!selectedTicket.aiResolution && (
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <p className="text-sm font-semibold text-amber-900 mb-2">Suggested AI Response:</p>
                    <p className="text-sm text-amber-800 mb-4">
                      {aiSuggestions[selectedTicket.category]}
                    </p>
                    <button
                      onClick={() => {
                        updateTicketStatus(
                          selectedTicket.id,
                          'ai-resolved',
                          aiSuggestions[selectedTicket.category]
                        )
                        setSelectedTicket(null)
                      }}
                      className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 text-sm font-medium"
                    >
                      Resolve with AI
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="mt-8 w-full border border-slate-300 py-2 rounded-lg hover:bg-slate-50"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
