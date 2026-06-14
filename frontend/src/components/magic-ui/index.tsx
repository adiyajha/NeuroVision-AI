import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export { Spotlight } from './spotlight'
export { Particles } from './particles'
export { AnimatedBeam } from './animated-beam'
export { NeuralNetwork } from './neural-network'

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  colorFrom = '#00f0ff',
  colorTo = '#8a2be2',
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          '--size': size,
          '--duration': duration,
          '--border-width': borderWidth,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]',
        '[background:linear-gradient(transparent,transparent)_padding-box,linear-gradient(to_right,var(--color-from),var(--color-to))_border-box]',
        '![mask-clip:padding-box,border-box] ![mask-composite:intersect]',
        '[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
        'after:absolute after:aspect-square after:w-[calc(var(--size)*1px)]',
        'after:animate-border-beam after:[animation-delay:var(--delay)]',
        'after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]',
        'after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]',
        className
      )}
    />
  )
}

interface NumberTickerProps {
  value: number
  direction?: 'up' | 'down'
  className?: string
  decimalPlaces?: number
  suffix?: string
  prefix?: string
}

export function NumberTicker({
  value,
  direction = 'up',
  className,
  decimalPlaces = 0,
  suffix = '',
  prefix = '',
}: NumberTickerProps) {
  const id = useId()
  const containerRef = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(direction === 'down' ? value : 0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return

    const duration = 2000
    const start = direction === 'down' ? value : 0
    const end = direction === 'down' ? 0 : value
    const startTime = performance.now()
    let frameId: number

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(start + (end - start) * eased)
      if (progress < 1) frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [value, direction, hasAnimated])

  return (
    <span
      ref={containerRef}
      className={cn('inline-block tabular-nums tracking-wider', className)}
      id={id}
    >
      {prefix}
      {display.toFixed(decimalPlaces)}
      {suffix}
    </span>
  )
}

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  vertical?: boolean
  repeat?: number
  duration?: string
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = '40s',
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]',
        vertical ? 'flex-col' : 'flex-row',
        className
      )}
      style={{ '--duration': duration } as React.CSSProperties}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex shrink-0 justify-around [gap:var(--gap)]',
              vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
              reverse && '[animation-direction:reverse]',
              pauseOnHover && 'group-hover:[animation-play-state:paused]'
            )}
          >
            {children}
          </div>
        ))}
    </div>
  )
}

interface BentoGridProps {
  className?: string
  children: React.ReactNode
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div className={cn('grid auto-rows-[12rem] grid-cols-1 gap-4 md:grid-cols-3', className)}>
      {children}
    </div>
  )
}

interface BentoCardProps {
  name: string
  className?: string
  background?: React.ReactNode
  Icon: React.ElementType
  description: string
  href?: string
  cta?: string
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
}: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl',
        'border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl',
        'hover:border-nv-cyan/20 hover:shadow-glow transition-shadow duration-500',
        className
      )}
    >
      {background}
      <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-1">
        <Icon className="h-8 w-8 text-nv-cyan mb-2" />
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nv-dark/80 to-transparent" />
    </motion.div>
  )
}
