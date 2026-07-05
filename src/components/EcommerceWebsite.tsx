import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Headphones, Mail, Phone } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export function EcommerceWebsite() {
  const { addTicket } = useAppStore()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', category: 'other' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTicket({
      id: Date.now().toString(),
      customerName: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      category: formData.category as any,
      status: 'open',
      createdAt: new Date().toISOString(),
    })
    setFormData({ name: '', email: '', subject: '', message: '', category: 'other' })
    setShowForm(false)
    alert('✅ Support ticket created! Check admin dashboard.')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-8 h-8" />
            <h1 className="text-3xl font-bold">BuildFast Ecommerce</h1>
          </div>
          <p className="text-amber-100">Premium products. Instant support.</p>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">AI-Powered Customer Support</h2>
          <p className="text-xl text-amber-100 mb-8">Instant answers 24/7. Real humans when you need them.</p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-amber-600 px-8 py-3 rounded-lg font-bold hover:bg-amber-50"
          >
            <Headphones className="w-5 h-5 inline mr-2" />
            Contact Support
          </button>
        </div>
      </section>

      {/* Support Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Support Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Order Issues', 'Shipping', 'Returns', 'Payment', 'Product', 'Other'].map((cat, i) => (
              <div key={i} className="p-6 rounded-lg border border-slate-200 hover:shadow-lg">
                <p className="font-bold text-lg mb-2">{cat}</p>
                <p className="text-slate-600 text-sm">Get instant AI support</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40">
          <motion.form
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-8 max-w-md w-full space-y-4"
          >
            <h3 className="text-2xl font-bold">Contact Support</h3>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="order">Order Issue</option>
              <option value="shipping">Shipping</option>
              <option value="returns">Returns</option>
              <option value="payment">Payment</option>
              <option value="product">Product Question</option>
              <option value="other">Other</option>
            </select>
            <textarea
              placeholder="Your message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows={4}
              required
            />
            <button type="submit" className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700">
              Submit Ticket
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="w-full text-slate-600 py-2">
              Cancel
            </button>
          </motion.form>
        </div>
      )}

      <footer className="bg-slate-900 text-white py-8 px-4 text-center">
        <p>© 2026 BuildFast Ecommerce</p>
      </footer>
    </div>
  )
}
