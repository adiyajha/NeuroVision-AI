import { Eye, Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-nv-dark/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5 text-nv-cyan" />
              <span className="font-bold tracking-widest text-sm">
                NEURO<span className="text-gradient">VISION</span> AI
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Emulating biological sensory architecture to deliver high-performance,
              cost-effective event-driven surveillance.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://github.com" className="text-muted-foreground hover:text-nv-cyan transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-muted-foreground hover:text-nv-cyan transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:info@neurovision.ai" className="text-muted-foreground hover:text-nv-cyan transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h6 className="text-xs font-mono uppercase tracking-widest text-white mb-4">Platform</h6>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Live Console</Link></li>
              <li><a href="/#how-it-works" className="hover:text-white transition-colors">Architecture</a></li>
              <li><a href="/#applications" className="hover:text-white transition-colors">Use Cases</a></li>
            </ul>
          </div>

          <div>
            <h6 className="text-xs font-mono uppercase tracking-widest text-white mb-4">Contact</h6>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@neurovision.ai</li>
              <li>NeuroVision AI Lab</li>
              <li>Tokyo Research District</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-muted-foreground">&copy; 2026 NeuroVision AI. MIT License.</span>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
