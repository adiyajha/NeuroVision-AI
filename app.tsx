/*-------------global.css------------/*

@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-display: var(--font-display), 'Geist Fallback';
  --font-heading: var(--font-display), 'Geist Fallback';
  --font-sans: var(--font-geist-sans), 'Geist Fallback';
  --font-mono: var(--font-geist-mono), 'Geist Mono Fallback';
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

/* ---------------- THEME — Cyber AI (dark) ---------------- */
:root {
  color-scheme: dark;

  /* base neutrals */
  --background: oklch(0.16 0.018 264);
  --foreground: oklch(0.97 0.005 250);
  --card: oklch(0.21 0.02 264);
  --card-foreground: oklch(0.97 0.005 250);
  --popover: oklch(0.19 0.02 264);
  --popover-foreground: oklch(0.97 0.005 250);
  --primary: oklch(0.78 0.16 230);
  --primary-foreground: oklch(0.16 0.02 264);
  --secondary: oklch(0.26 0.02 264);
  --secondary-foreground: oklch(0.97 0.005 250);
  --muted: oklch(0.26 0.02 264);
  --muted-foreground: oklch(0.68 0.025 258);
  --accent: oklch(0.26 0.03 264);
  --accent-foreground: oklch(0.97 0.005 250);
  --destructive: oklch(0.62 0.24 18);
  --border: oklch(1 0 0 / 9%);
  --input: oklch(1 0 0 / 14%);
  --ring: oklch(0.78 0.16 230);
  --radius: 0.9rem;

  /* brand accents */
  --cyber: oklch(0.78 0.16 230);
  --violet: oklch(0.65 0.25 295);
}

@theme inline {
  --color-cyber: var(--cyber);
  --color-violet: var(--violet);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  html {
    @apply font-sans;
    scroll-behavior: smooth;
  }
  body {
    @apply bg-background text-foreground antialiased;
    -webkit-font-smoothing: antialiased;
  }
  ::selection {
    background: color-mix(in oklch, var(--cyber) 40%, transparent);
    color: var(--foreground);
  }
  /* refined scrollbar */
  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: oklch(1 0 0 / 10%);
    border-radius: 9999px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }
  ::-webkit-scrollbar-thumb:hover { background: color-mix(in oklch, var(--cyber) 50%, oklch(1 0 0 / 10%)); background-clip: padding-box; }
}

/* ---------------- GLASSMORPHISM ---------------- */
@utility glass {
  background: linear-gradient(180deg, oklch(1 0 0 / 7%), oklch(1 0 0 / 3%));
  border: 1px solid oklch(1 0 0 / 10%);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  box-shadow:
    0 1px 0 0 oklch(1 0 0 / 8%) inset,
    0 1px 24px -8px oklch(0 0 0 / 60%);
}

@utility glass-strong {
  background: linear-gradient(180deg, oklch(1 0 0 / 10%), oklch(1 0 0 / 4%));
  border: 1px solid oklch(1 0 0 / 14%);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  box-shadow:
    0 1px 0 0 oklch(1 0 0 / 12%) inset,
    0 8px 40px -12px oklch(0 0 0 / 70%);
}

/* ---------------- SHADOWS ---------------- */
@utility shadow-elevated {
  box-shadow:
    0 1px 0 0 oklch(1 0 0 / 10%) inset,
    0 24px 70px -24px oklch(0 0 0 / 80%),
    0 0 0 1px oklch(1 0 0 / 4%);
}

@utility glow-cyber {
  box-shadow: 0 0 24px -2px color-mix(in oklch, var(--cyber) 70%, transparent);
}

/* ---------------- GRADIENT TEXT ---------------- */
@utility text-gradient {
  background: linear-gradient(180deg, oklch(0.99 0 0), oklch(0.78 0.05 250));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@utility text-brand-gradient {
  background: linear-gradient(110deg, var(--cyber), var(--violet) 80%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ---------------- BACKGROUNDS ---------------- */
@utility bg-hero {
  background:
    radial-gradient(60% 50% at 50% 0%, color-mix(in oklch, var(--cyber) 16%, transparent), transparent 70%),
    radial-gradient(50% 50% at 80% 30%, color-mix(in oklch, var(--violet) 14%, transparent), transparent 70%),
    radial-gradient(60% 60% at 15% 70%, color-mix(in oklch, var(--cyber) 10%, transparent), transparent 70%);
}

@utility bg-grid {
  background-image:
    linear-gradient(to right, oklch(1 0 0 / 6%) 1px, transparent 1px),
    linear-gradient(to bottom, oklch(1 0 0 / 6%) 1px, transparent 1px);
  background-size: 56px 56px;
}

/* ---------------- BUTTONS ---------------- */
@utility btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  padding: 0.75rem 1.4rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: oklch(0.14 0.02 264);
  background: linear-gradient(180deg, oklch(0.92 0.08 235), var(--cyber));
  border: 1px solid color-mix(in oklch, var(--cyber) 60%, white 10%);
  box-shadow:
    0 1px 0 0 oklch(1 0 0 / 50%) inset,
    0 10px 30px -10px color-mix(in oklch, var(--cyber) 70%, transparent);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s, filter 0.3s;
}
@utility btn-primary {
  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
    box-shadow:
      0 1px 0 0 oklch(1 0 0 / 60%) inset,
      0 18px 44px -12px color-mix(in oklch, var(--cyber) 80%, transparent);
  }
  &:active { transform: translateY(0); }
}

@utility btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  padding: 0.75rem 1.4rem;
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--foreground);
  background: oklch(1 0 0 / 4%);
  border: 1px solid oklch(1 0 0 / 12%);
  backdrop-filter: blur(12px);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s, border-color 0.3s;
}
@utility btn-ghost {
  &:hover {
    transform: translateY(-2px);
    background: oklch(1 0 0 / 8%);
    border-color: color-mix(in oklch, var(--cyber) 40%, oklch(1 0 0 / 12%));
  }
  &:active { transform: translateY(0); }
}

/* ---------------- ANIMATIONS ---------------- */
@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.04); }
}
@utility animate-pulse-glow {
  animation: pulse-glow 4s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-30px) translateX(12px); }
  100% { transform: translateY(0) translateX(0); }
}
@utility animate-float {
  animation: float linear infinite;
}

@keyframes grid-pan {
  0% { background-position: 0 0; }
  100% { background-position: 56px 56px; }
}
@utility animate-grid-pan {
  animation: grid-pan 8s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
/*--------------------LAYOUT.tsx----------------------/*
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'NeuroVision AI — Intelligence That Activates Only When It Matters',
  description:
    'Brain-inspired AI that activates only when meaningful events occur. 95% less processing. Real-time awareness. The future of event-driven intelligence.',
  generator: 'v0.app',
  openGraph: {
    title: 'NeuroVision AI',
    description: 'Intelligence that activates only when it matters.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0f1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
/*------------------------------PAGE.tsx-------------/*
import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { ProblemSection } from "@/components/problem-section"
import { BreakthroughSection } from "@/components/breakthrough-section"
import { HowItWorks } from "@/components/how-it-works"
import { LiveExperience } from "@/components/live-experience"
import { ImpactSection } from "@/components/impact-section"
import { ApplicationsSection } from "@/components/applications-section"
import { WhyItMatters } from "@/components/why-it-matters"
import { FutureVision } from "@/components/future-vision"
import { FinalCTA, Footer } from "@/components/cta-footer"

export default function NeuroVisionLanding() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Nav />
      <Hero />
      <ProblemSection />
      <BreakthroughSection />
      <HowItWorks />
      <LiveExperience />
      <ImpactSection />
      <ApplicationsSection />
      <WhyItMatters />
      <FutureVision />
      <FinalCTA />
      <Footer />
    </main>
  )
}


 
 

