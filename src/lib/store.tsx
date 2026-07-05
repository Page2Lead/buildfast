import React, { createContext, useContext, useState } from 'react'
import type { Ticket } from '@/types'

interface AppStore {
  tickets: Ticket[]
  addTicket: (ticket: Ticket) => void
  updateTicketStatus: (ticketId: string, status: Ticket['status'], resolution?: string) => void
  getStats: () => any
}

const StoreContext = createContext<AppStore | null>(null)

const seedTickets: Ticket[] = [
  {
    id: '1',
    customerName: 'Amit Kumar',
    email: 'amit@email.com',
    subject: 'Order #12345 not received',
    message: 'I placed order on July 1st. Its been 4 days and I havent received it yet.',
    category: 'shipping',
    status: 'ai-resolved',
    aiResolution: 'Your order is in transit. Expected delivery July 7th. Tracking: TRK123456',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    customerName: 'Priya Singh',
    email: 'priya@email.com',
    subject: 'Want to return my purchase',
    message: 'Bought a shirt but wrong size. How to return?',
    category: 'returns',
    status: 'ai-resolved',
    aiResolution: 'Returns accepted within 30 days. Free return shipping. Log into account > Returns to start.',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    customerName: 'Rahul Patel',
    email: 'rahul@email.com',
    subject: 'Payment declined but money deducted',
    message: 'My card payment failed but ₹5000 was deducted from my account',
    category: 'payment',
    status: 'escalated',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
]

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(seedTickets)

  const addTicket = (ticket: Ticket) => {
    setTickets((prev) => [ticket, ...prev])
  }

  const updateTicketStatus = (ticketId: string, status: Ticket['status'], resolution?: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, status, aiResolution: resolution, resolvedAt: status !== 'open' ? new Date().toISOString() : undefined }
          : t
      )
    )
  }

  const getStats = () => ({
    totalTickets: tickets.length,
    aiResolved: tickets.filter((t) => t.status === 'ai-resolved').length,
    escalated: tickets.filter((t) => t.status === 'escalated').length,
  })

  return (
    <StoreContext.Provider value={{ tickets, addTicket, updateTicketStatus, getStats }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useAppStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useAppStore must be used within AppStoreProvider')
  return context
}
