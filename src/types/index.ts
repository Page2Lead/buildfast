export interface Ticket {
  id: string
  customerName: string
  email: string
  subject: string
  message: string
  category: 'order' | 'shipping' | 'returns' | 'payment' | 'product' | 'other'
  status: 'open' | 'ai-resolved' | 'escalated' | 'closed'
  aiResolution?: string
  createdAt: string
  resolvedAt?: string
}

export interface DashboardStats {
  totalTickets: number
  aiResolved: number
  escalated: number
}
