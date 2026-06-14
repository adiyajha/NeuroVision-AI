import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import { Particles } from '@/components/magic-ui/particles'
import { HomePage } from '@/pages/HomePage'
import { DashboardPage } from '@/pages/DashboardPage'

export default function App() {
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'

  return (
    <>
      {!isDashboard && <Particles quantity={40} />}
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
      {location.pathname === '/' && <Footer />}
    </>
  )
}
