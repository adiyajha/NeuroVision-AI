import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import { FadeIn } from '@/components/layout/PageTransition'

export function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-nv-glow" />
      <div className="relative max-w-4xl mx-auto text-center px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            <span className="text-muted-foreground">Traditional surveillance</span>
            <br />
            <span className="text-white">watches everything.</span>
            <br />
            <span className="text-gradient">NeuroVision AI understands what matters.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Building the future of event-driven intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/dashboard" className="btn-primary">
              Request Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#innovation" className="btn-secondary">Learn More</a>
            <a href="mailto:info@neurovision.ai" className="btn-secondary">
              <Mail className="h-4 w-4" /> Contact
            </a>
          </div>

          <div className="glass-card p-6 max-w-md mx-auto">
            <p className="text-sm text-muted-foreground mb-4">Stay informed</p>
            {submitted ? (
              <p className="text-nv-cyan text-sm font-medium">Thanks — you&apos;re on the list.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-nv-cyan/40 transition-colors"
                />
                <button type="submit" className="btn-primary text-xs px-5 py-2.5 shrink-0">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
