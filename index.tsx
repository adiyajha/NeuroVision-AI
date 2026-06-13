import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useScroll, useTransform, animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Eye, Brain, Zap, Activity, ShieldCheck, Radar, Cpu, Sparkles,
  Home, Building2, Car, Factory, Trees, HeartPulse, Plug, Users,
  Play, ArrowRight, ArrowUpRight, Check, Circle, AlertTriangle,
  Camera, MapPin, Clock,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuroVision AI — Intelligence That Activates Only When It Matters" },
      { name: "description", content: "Brain-inspired AI that activates only when meaningful events occur. 95% less processing. Real-time awareness. The future of event-driven intelligence." },
      { property: "og:title", content: "NeuroVision AI" },
      { property: "og:description", content: "Intelligence that activates only when it matters." },
    ],
  }),
  component: NeuroVisionLanding,
});

function NeuroVisionLanding() {
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
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-elevated" : ""
        }`}>
          <a href="#" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display font-semibold tracking-tight">NeuroVision<span className="text-[color:var(--cyber)]"> AI</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#problem" className="hover:text-foreground transition-colors">Problem</a>
            <a href="#breakthrough" className="hover:text-foreground transition-colors">Breakthrough</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#applications" className="hover:text-foreground transition-colors">Applications</a>
            <a href="#vision" className="hover:text-foreground transition-colors">Vision</a>
          </nav>
          <a href="#contact" className="btn-primary text-sm py-2 px-4">
            Request demo
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <div className="relative w-8 h-8 rounded-lg overflow-hidden glass-strong grid place-items-center">
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg,var(--cyber),var(--violet),var(--cyber))] opacity-60 animate-pulse-glow" />
      <Brain className="relative w-4 h-4 text-white" />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative pt-40 pb-32 min-h-screen flex items-center overflow-hidden">
      <NeuralBackground />
      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-7xl px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <div className="glass inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full text-muted-foreground">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--cyber)] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--cyber)]" />
            </span>
            Now in private preview
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-center font-display font-semibold tracking-tighter text-[clamp(3rem,9vw,8rem)] leading-[0.95]"
        >
          <span className="text-gradient">NeuroVision</span>
          <span className="block text-brand-gradient">AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-center text-xl md:text-2xl font-light text-foreground/90"
        >
          Intelligence That Activates Only When It Matters
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 mx-auto max-w-2xl text-center text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          Traditional surveillance watches everything. NeuroVision AI understands what matters —
          inspired by the human brain, activating intelligence only when meaningful events occur.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#live" className="btn-primary">
            <Play className="w-4 h-4" /> Watch Demo
          </a>
          <a href="#breakthrough" className="btn-ghost">
            Explore Innovation <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto"
        >
          <HeroMetric value="95%" label="Less Processing" icon={<Cpu className="w-4 h-4" />} />
          <HeroMetric value="92%" label="Resource Savings" icon={<Zap className="w-4 h-4" />} />
          <HeroMetric value="Real-Time" label="Intelligence" icon={<Activity className="w-4 h-4" />} />
          <HeroMetric value="Brain" label="Inspired Architecture" icon={<Brain className="w-4 h-4" />} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroMetric({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl px-5 py-5 text-center hover:border-white/20 transition-colors group">
      <div className="flex items-center justify-center gap-2 text-[color:var(--cyber)] mb-2">
        {icon}
        <span className="text-2xl md:text-3xl font-display font-semibold text-gradient">{value}</span>
      </div>
      <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}

/* Neural background with flowing particles + pathways */
function NeuralBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)]" />
      <NeuralSvg />
      <Particles count={40} />
      {/* surveillance corner brackets */}
      <div className="absolute top-32 left-10 w-24 h-24 border-l-2 border-t-2 border-[color:var(--cyber)]/30 rounded-tl-2xl" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border-r-2 border-b-2 border-[color:var(--violet)]/30 rounded-br-2xl" />
      <div className="absolute top-40 right-16 text-[10px] font-mono text-[color:var(--cyber)]/50 tracking-widest">
        CH·01 ▸ ACTIVE
      </div>
      <div className="absolute bottom-32 left-16 text-[10px] font-mono text-[color:var(--violet)]/50 tracking-widest">
        STATE ▸ FOCUSED
      </div>
    </div>
  );
}

function NeuralSvg() {
  const nodes = Array.from({ length: 18 }, (_, i) => ({
    cx: (i * 137) % 100,
    cy: (i * 211) % 100,
  }));
  return (
    <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="nLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.16 230)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.65 0.25 295)" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="nNode">
          <stop offset="0%" stopColor="oklch(0.85 0.18 250)" stopOpacity="1" />
          <stop offset="100%" stopColor="oklch(0.85 0.18 250)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {nodes.map((n, i) =>
        nodes.slice(i + 1, i + 4).map((m, j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={n.cx} y1={n.cy} x2={m.cx} y2={m.cy}
            stroke="url(#nLine)"
            strokeWidth="0.08"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.7, 0.2] }}
            transition={{ duration: 4 + (i % 3), delay: i * 0.15, repeat: Infinity, repeatType: "reverse" }}
          />
        ))
      )}
      {nodes.map((n, i) => (
        <motion.circle
          key={`n${i}`}
          cx={n.cx} cy={n.cy} r="0.6"
          fill="url(#nNode)"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

function Particles({ count = 30 }: { count?: number }) {
  const particles = Array.from({ length: count });
  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((_, i) => {
        const size = 1 + Math.random() * 2.5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const dur = 10 + Math.random() * 20;
        const delay = Math.random() * -20;
        const color = Math.random() > 0.5 ? "var(--cyber)" : "var(--violet)";
        return (
          <span
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: size, height: size,
              left: `${left}%`, top: `${top}%`,
              background: `oklch(0.85 0.18 250)`,
              boxShadow: `0 0 ${size * 4}px ${color}`,
              opacity: 0.4 + Math.random() * 0.5,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------------- SECTION HELPERS ---------------- */
function SectionHeader({ eyebrow, title, description, align = "center" }: {
  eyebrow?: string; title: React.ReactNode; description?: React.ReactNode; align?: "center" | "left";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.25em] text-[color:var(--cyber)] mb-4 font-mono">
          {eyebrow}
        </div>
      )}
      <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tighter leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- PROBLEM ---------------- */
function ProblemSection() {
  const items = [
    { icon: <Cpu className="w-5 h-5" />, title: "Wasted Computation", text: "Endless cycles spent analyzing empty frames where nothing happens." },
    { icon: <Zap className="w-5 h-5" />, title: "Wasted Energy", text: "Always-on intelligence consumes power 24/7 — most of it for nothing." },
    { icon: <Activity className="w-5 h-5" />, title: "Noise Over Signal", text: "Critical events drown in oceans of irrelevant data." },
    { icon: <Radar className="w-5 h-5" />, title: "Scale Breaks Down", text: "Every new camera multiplies cost. Growth becomes a liability." },
  ];

  return (
    <section id="problem" className="relative py-32 px-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[color:var(--violet)]/10 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="The Problem"
            title={<>The Hidden Cost of <span className="text-gradient">Continuous Surveillance</span></>}
            description="Most systems analyze every moment — even when nothing is happening. The result: enormous waste hiding in plain sight."
          />
        </Reveal>

        <div className="mt-20 grid lg:grid-cols-5 gap-6 items-stretch">
          <Reveal>
            <div className="lg:col-span-2 glass rounded-3xl p-8 h-full relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[color:var(--violet)]/20 blur-3xl" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-mono">// Today</div>
                <div className="space-y-3">
                  {["02:14:09", "02:14:10", "02:14:11", "02:14:12", "02:14:13", "02:14:14"].map((t) => (
                    <div key={t} className="flex items-center gap-3 text-sm font-mono text-muted-foreground/70">
                      <Camera className="w-3.5 h-3.5" />
                      <span className="tabular-nums">{t}</span>
                      <span className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                      <span className="text-[color:var(--cyber)]/60 text-xs">analyzed</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="text-3xl font-display font-semibold">99.7%</div>
                  <div className="text-sm text-muted-foreground mt-1">of frames contain no meaningful event</div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 h-full group hover:border-[color:var(--cyber)]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl grid place-items-center bg-gradient-to-br from-[color:var(--cyber)]/20 to-[color:var(--violet)]/20 text-[color:var(--cyber)] mb-4">
                    {it.icon}
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2">{it.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BREAKTHROUGH ---------------- */
function BreakthroughSection() {
  return (
    <section id="breakthrough" className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="The Breakthrough"
            title={<>Inspired by <span className="text-brand-gradient">Human Attention</span></>}
            description="Your brain ignores the predictable — and snaps to attention the instant something matters. NeuroVision AI works the same way."
          />
        </Reveal>

        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <BrainVisualization />
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-mono">Ignores</div>
                <ul className="space-y-3">
                  {["Background movement", "Repetitive patterns", "Irrelevant activity"].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <div className="text-xs uppercase tracking-widest text-[color:var(--cyber)] mb-3 font-mono">Instantly reacts to</div>
                <ul className="space-y-3">
                  {[
                    { t: "Meaningful change", i: <Sparkles className="w-4 h-4" /> },
                    { t: "Unexpected motion", i: <Activity className="w-4 h-4" /> },
                    { t: "Potential threats", i: <ShieldCheck className="w-4 h-4" /> },
                  ].map((x) => (
                    <li key={x.t} className="flex items-center gap-3 text-foreground">
                      <span className="w-7 h-7 rounded-lg grid place-items-center bg-gradient-to-br from-[color:var(--cyber)]/20 to-[color:var(--violet)]/20 text-[color:var(--cyber)]">
                        {x.i}
                      </span>
                      <span className="font-medium">{x.t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-lg text-muted-foreground leading-relaxed pt-4 border-t border-white/5">
                NeuroVision AI follows the same principle — staying silent through the predictable,
                awakening with full intelligence when something meaningful happens.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrainVisualization() {
  return (
    <div className="relative aspect-square max-w-lg mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[color:var(--cyber)]/20 to-[color:var(--violet)]/20 blur-3xl animate-pulse-glow" />
      <div className="relative w-full h-full glass-strong rounded-[2.5rem] overflow-hidden shadow-elevated">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <radialGradient id="brainGlow">
              <stop offset="0%" stopColor="oklch(0.78 0.16 230)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="oklch(0.65 0.25 295)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="syn" x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(0.78 0.16 230)" />
              <stop offset="100%" stopColor="oklch(0.65 0.25 295)" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="160" fill="url(#brainGlow)" opacity="0.6" />
          {/* synapse arcs */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const r1 = 60, r2 = 140;
            const x1 = 200 + Math.cos(angle) * r1;
            const y1 = 200 + Math.sin(angle) * r1;
            const x2 = 200 + Math.cos(angle) * r2;
            const y2 = 200 + Math.sin(angle) * r2;
            return (
              <motion.line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="url(#syn)" strokeWidth="1.2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.8, 0.1] }}
                transition={{ duration: 3, delay: i * 0.15, repeat: Infinity }}
              />
            );
          })}
          {/* core */}
          <motion.circle
            cx="200" cy="200" r="40"
            fill="none"
            stroke="url(#syn)" strokeWidth="1.5"
            animate={{ r: [40, 50, 40], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <circle cx="200" cy="200" r="6" fill="oklch(0.92 0.1 250)" />
          {/* outer nodes */}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const r = 170;
            const x = 200 + Math.cos(a) * r;
            const y = 200 + Math.sin(a) * r;
            return (
              <motion.circle
                key={i} cx={x} cy={y} r="2"
                fill="oklch(0.85 0.15 250)"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: i * 0.08, repeat: Infinity }}
              />
            );
          })}
        </svg>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-mono text-muted-foreground/70 tracking-widest uppercase">
          <span>Attention · Active</span>
          <span>Focus · 99.1%</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    { n: "01", icon: <Eye className="w-6 h-6" />, title: "Observe", text: "Continuous awareness of the environment — passive, efficient, always present." },
    { n: "02", icon: <Radar className="w-6 h-6" />, title: "Detect", text: "Recognize meaningful activity the moment it emerges from the baseline." },
    { n: "03", icon: <Brain className="w-6 h-6" />, title: "Understand", text: "Awaken full intelligence to analyze the event with deep context." },
    { n: "04", icon: <Zap className="w-6 h-6" />, title: "Respond", text: "Deliver insights and alerts instantly — to the right person, at the right time." },
  ];

  return (
    <section id="how" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="How it works"
            title={<>A New <span className="text-gradient">Sensing Loop</span></>}
            description="Four stages. One continuous cycle. Built to mirror how living intelligence engages with the world."
          />
        </Reveal>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group relative glass rounded-3xl p-7 h-full overflow-hidden hover:border-[color:var(--cyber)]/40 transition-all duration-500">
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[color:var(--violet)]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono text-muted-foreground/60 tracking-widest">{s.n}</span>
                    <div className="w-12 h-12 rounded-2xl grid place-items-center bg-gradient-to-br from-[color:var(--cyber)]/15 to-[color:var(--violet)]/15 text-[color:var(--cyber)] group-hover:scale-110 transition-transform">
                      {s.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- LIVE EXPERIENCE ---------------- */
function LiveExperience() {
  return (
    <section id="live" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] animate-grid-pan" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Live Experience"
            title={<>The Command Center for <span className="text-brand-gradient">What Matters</span></>}
            description="A single, unified view of meaningful events — beautifully designed, instantly actionable."
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-[color:var(--cyber)]/20 via-transparent to-[color:var(--violet)]/20 blur-3xl -z-10" />
            <Dashboard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <div className="glass-strong rounded-3xl p-3 md:p-4 shadow-elevated">
      {/* window chrome */}
      <div className="flex items-center justify-between px-3 py-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
        <div className="text-xs font-mono text-muted-foreground hidden md:block">neurovision.ai · operations</div>
        <div className="text-xs font-mono text-[color:var(--cyber)] flex items-center gap-2">
          <Circle className="w-2 h-2 fill-current" /> LIVE
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        {/* Live monitor */}
        <div className="lg:col-span-2 rounded-2xl bg-black/40 border border-white/5 overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between border-b border-white/5">
            <div className="text-sm font-medium flex items-center gap-2">
              <Camera className="w-4 h-4 text-[color:var(--cyber)]" /> Live Monitoring
            </div>
            <div className="text-xs font-mono text-muted-foreground">04 streams · 1 active event</div>
          </div>
          <div className="grid grid-cols-2 gap-2 p-3">
            {[
              { id: "NORTH·01", state: "idle", label: "Perimeter — North" },
              { id: "LOBBY·02", state: "alert", label: "Main Lobby" },
              { id: "SVC·03", state: "idle", label: "Service Corridor" },
              { id: "DOCK·04", state: "idle", label: "Loading Dock" },
            ].map((cam) => (
              <CamTile key={cam.id} {...cam} />
            ))}
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-3">
          <ThreatPanel />
          <SavingsPanel />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <EventsPanel />
        <ActivityPanel />
      </div>
    </div>
  );
}

function CamTile({ id, state, label }: { id: string; state: string; label: string }) {
  const alert = state === "alert";
  return (
    <div className={`relative aspect-video rounded-xl overflow-hidden border ${alert ? "border-[color:var(--violet)]/50" : "border-white/5"}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--cyber)]/10 via-transparent to-[color:var(--violet)]/15" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,white/5,transparent_60%)]" />
      {/* scan line */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[color:var(--cyber)] to-transparent"
        animate={{ y: [0, 200, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono tracking-wider">
        <span className="text-white/70">{id}</span>
        <span className={alert ? "text-[color:var(--violet)]" : "text-white/40"}>
          {alert ? "● EVENT" : "○ IDLE"}
        </span>
      </div>
      {alert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-14 border-2 border-[color:var(--violet)] rounded-md"
        >
          <span className="absolute -top-5 left-0 text-[10px] font-mono text-[color:var(--violet)]">person · 97%</span>
        </motion.div>
      )}
      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/60">{label}</div>
    </div>
  );
}

function ThreatPanel() {
  return (
    <div className="rounded-2xl bg-black/40 border border-white/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[color:var(--violet)]" /> Threat Detection
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">live</span>
      </div>
      <div className="space-y-2.5">
        <ThreatRow icon={<AlertTriangle className="w-3.5 h-3.5" />} label="Unauthorized motion" loc="Lobby" level={92} color="violet" />
        <ThreatRow icon={<Activity className="w-3.5 h-3.5" />} label="Loitering pattern" loc="Dock" level={48} color="cyber" />
        <ThreatRow icon={<MapPin className="w-3.5 h-3.5" />} label="Geofence boundary" loc="North" level={12} color="cyber" />
      </div>
    </div>
  );
}

function ThreatRow({ icon, label, loc, level, color }: { icon: React.ReactNode; label: string; loc: string; level: number; color: "cyber" | "violet" }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="flex items-center gap-2 text-foreground/90">{icon} {label}</span>
        <span className="font-mono text-muted-foreground">{loc} · {level}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`h-full rounded-full ${color === "violet" ? "bg-[color:var(--violet)]" : "bg-[color:var(--cyber)]"}`}
        />
      </div>
    </div>
  );
}

function SavingsPanel() {
  return (
    <div className="rounded-2xl bg-black/40 border border-white/5 p-4">
      <div className="text-sm font-medium flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-[color:var(--cyber)]" /> Resource Savings
      </div>
      <div className="text-4xl font-display font-semibold text-gradient">92%</div>
      <div className="text-xs text-muted-foreground mt-1">vs. always-on baseline</div>
      <div className="mt-3 flex gap-1 h-10">
        {Array.from({ length: 24 }).map((_, i) => {
          const h = 20 + ((i * 37) % 80);
          return (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.02 }}
              style={{ height: `${h}%` }}
              className="flex-1 rounded-sm bg-gradient-to-t from-[color:var(--cyber)]/60 to-[color:var(--violet)]/60 origin-bottom"
            />
          );
        })}
      </div>
    </div>
  );
}

function EventsPanel() {
  const events = [
    { t: "14:02:31", e: "Person detected", loc: "Lobby", k: "violet" },
    { t: "13:48:09", e: "Vehicle arrival", loc: "Dock", k: "cyber" },
    { t: "13:31:55", e: "Door opened", loc: "Service", k: "cyber" },
    { t: "13:12:02", e: "Idle baseline", loc: "All", k: "muted" },
  ];
  return (
    <div className="rounded-2xl bg-black/40 border border-white/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4 text-[color:var(--cyber)]" /> Recent Events
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">last 60 min</span>
      </div>
      <div className="space-y-2">
        {events.map((ev) => (
          <div key={ev.t} className="flex items-center gap-3 text-xs py-2 border-b border-white/5 last:border-0">
            <span className={`w-1.5 h-1.5 rounded-full ${
              ev.k === "violet" ? "bg-[color:var(--violet)]" : ev.k === "cyber" ? "bg-[color:var(--cyber)]" : "bg-white/30"
            }`} />
            <span className="font-mono text-muted-foreground tabular-nums">{ev.t}</span>
            <span className="text-foreground/90 flex-1">{ev.e}</span>
            <span className="text-muted-foreground">{ev.loc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityPanel() {
  return (
    <div className="rounded-2xl bg-black/40 border border-white/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium flex items-center gap-2">
          <Activity className="w-4 h-4 text-[color:var(--violet)]" /> System Activity
        </div>
        <span className="text-[10px] font-mono text-[color:var(--cyber)]">focused</span>
      </div>
      <svg viewBox="0 0 200 80" className="w-full h-24">
        <defs>
          <linearGradient id="actGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.16 230)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.78 0.16 230)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,60 L20,58 L40,62 L55,30 L60,18 L70,55 L90,62 L110,60 L125,25 L135,40 L160,62 L180,60 L200,58"
          fill="none" stroke="oklch(0.78 0.16 230)" strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <path
          d="M0,60 L20,58 L40,62 L55,30 L60,18 L70,55 L90,62 L110,60 L125,25 L135,40 L160,62 L180,60 L200,58 L200,80 L0,80 Z"
          fill="url(#actGrad)"
        />
      </svg>
      <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
        <div><div className="text-muted-foreground">Awake</div><div className="font-display text-lg">8%</div></div>
        <div><div className="text-muted-foreground">Latency</div><div className="font-display text-lg">42ms</div></div>
        <div><div className="text-muted-foreground">Events</div><div className="font-display text-lg">12</div></div>
      </div>
    </div>
  );
}

/* ---------------- IMPACT ---------------- */
function ImpactSection() {
  const stats = [
    { value: 95, suffix: "%", label: "Less Processing" },
    { value: 92, suffix: "%", label: "Lower Resource Usage" },
    { value: 0, prefix: "", display: "Real-Time", label: "Threat Awareness" },
    { value: 0, display: "Instant", label: "Event Detection" },
  ];
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Impact"
            title={<>The Numbers Behind the <span className="text-brand-gradient">Quiet Revolution</span></>}
          />
        </Reveal>
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <StatCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, suffix, display, label }: { value: number; suffix?: string; display?: string; label: string }) {
  return (
    <div className="relative glass-strong rounded-3xl p-8 overflow-hidden group">
      <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[color:var(--cyber)]/10 blur-3xl group-hover:bg-[color:var(--cyber)]/20 transition-colors duration-700" />
      <div className="relative">
        <div className="text-5xl md:text-6xl font-display font-semibold text-gradient tabular-nums leading-none">
          {display ? display : <Counter to={value} />}{suffix}
        </div>
        <div className="mt-4 text-sm text-muted-foreground uppercase tracking-widest">{label}</div>
      </div>
    </div>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, to, mv]);

  return <span ref={ref}>{display}</span>;
}

/* ---------------- APPLICATIONS ---------------- */
function ApplicationsSection() {
  const apps = [
    { icon: <Home />, title: "Home Security", text: "Quiet protection for what you love most." },
    { icon: <Building2 />, title: "Smart Cities", text: "Awareness at the scale of an entire city." },
    { icon: <Car />, title: "Transportation", text: "Watch movement, not motion." },
    { icon: <Factory />, title: "Industrial Safety", text: "Catch the moment before it becomes an incident." },
    { icon: <Trees />, title: "Wildlife Monitoring", text: "Observe nature without disturbing it." },
    { icon: <HeartPulse />, title: "Healthcare", text: "Attentive care without constant surveillance." },
    { icon: <Plug />, title: "Critical Infrastructure", text: "Protect what powers everything else." },
    { icon: <Users />, title: "Public Spaces", text: "Safety that respects the rhythm of life." },
  ];
  return (
    <section id="applications" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Applications"
            title={<>Built for <span className="text-gradient">Every Environment</span></>}
            description="From a single doorway to an entire city — NeuroVision AI adapts to wherever attention matters most."
          />
        </Reveal>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {apps.map((a, i) => (
            <Reveal key={a.title} delay={(i % 4) * 0.06}>
              <div className="group glass rounded-3xl p-6 h-full hover:border-[color:var(--cyber)]/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br from-[color:var(--cyber)]/10 to-[color:var(--violet)]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl grid place-items-center glass mb-5 text-[color:var(--cyber)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <span className="[&>svg]:w-5 [&>svg]:h-5">{a.icon}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY IT MATTERS ---------------- */
function WhyItMatters() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-r from-[color:var(--cyber)]/10 to-[color:var(--violet)]/10 blur-[140px]" />
      </div>
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.25em] text-[color:var(--cyber)] mb-6 font-mono">Why it matters</div>
            <h2 className="text-4xl md:text-7xl font-display font-semibold tracking-tighter leading-[1.02]">
              A new approach to
              <br />
              <span className="text-brand-gradient">intelligence.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-20 grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="glass rounded-3xl p-8 h-full">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">Before</div>
              <p className="text-2xl font-display font-medium leading-snug text-foreground/70">
                Most systems process <span className="line-through decoration-[color:var(--violet)]/50">everything</span>.
              </p>
              <p className="mt-4 text-muted-foreground">More data. More cost. More noise. Less clarity.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass-strong rounded-3xl p-8 h-full relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[color:var(--cyber)]/20 blur-3xl" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-[color:var(--cyber)] mb-4 font-mono">With NeuroVision AI</div>
                <p className="text-2xl font-display font-medium leading-snug">
                  We focus only on <span className="text-brand-gradient">what matters</span>.
                </p>
                <p className="mt-4 text-muted-foreground">Smarter. Faster. More efficient. The future of intelligent monitoring.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FUTURE VISION ---------------- */
function FutureVision() {
  const phases = [
    { phase: "Now", title: "Intelligent Recognition", text: "Detect and understand meaningful events in real time." },
    { phase: "Next", title: "Advanced Threat Understanding", text: "Reason about intent and context before action." },
    { phase: "2026", title: "Environmental Awareness", text: "Sense the broader state of a space — beyond visual cues." },
    { phase: "2027", title: "Predictive Intelligence", text: "Anticipate events moments before they unfold." },
    { phase: "Horizon", title: "Autonomous Monitoring", text: "Self-coordinating networks of attentive intelligence." },
  ];
  return (
    <section id="vision" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Future Vision"
            title={<>The <span className="text-gradient">Evolution</span> of Attention</>}
            description="A roadmap toward intelligence that is not only aware — but anticipatory."
          />
        </Reveal>

        <div className="mt-20 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
          <div className="space-y-12">
            {phases.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className={`pl-12 md:pl-0 ${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                    <div className="text-xs uppercase tracking-widest text-[color:var(--cyber)] mb-2 font-mono">{p.phase}</div>
                    <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2">{p.title}</h3>
                    <p className="text-muted-foreground">{p.text}</p>
                  </div>
                  <div className="hidden md:block" />
                  {/* node */}
                  <div className="absolute left-4 md:left-1/2 top-4 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-[color:var(--cyber)] to-[color:var(--violet)] glow-cyber" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section id="contact" className="relative py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-[color:var(--cyber)]/20 via-[color:var(--violet)]/20 to-[color:var(--cyber)]/20 blur-[120px] rounded-full" />
        <Particles count={20} />
      </div>
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <h2 className="text-4xl md:text-7xl font-display font-semibold tracking-tighter leading-[1.02]">
            Traditional surveillance
            <br />
            <span className="text-foreground/40">watches everything.</span>
          </h2>
          <h2 className="mt-3 text-4xl md:text-7xl font-display font-semibold tracking-tighter leading-[1.02]">
            <span className="text-brand-gradient">NeuroVision AI</span>
            <br />
            understands what matters.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-10 text-lg text-muted-foreground max-w-2xl mx-auto">
            Building the future of event-driven intelligence.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a href="#" className="btn-primary">Request Demo <ArrowRight className="w-4 h-4" /></a>
            <a href="#" className="btn-ghost">Learn More</a>
            <a href="#" className="btn-ghost">Contact</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-display font-semibold">NeuroVision AI</span>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Intelligence that activates only when it matters.
        </p>
        <div className="text-xs font-mono text-muted-foreground">
          © {new Date().getFullYear()} · All rights reserved
        </div>
      </div>
    </footer>
  );
}
