import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface NeuralNetworkProps {
  className?: string
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  layer: number
}

export function NeuralNetwork({ className }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = 0
    let height = 0
    const nodes: Node[] = []
    const layers = [4, 6, 6, 3]

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      width = rect.width
      height = rect.height
      initNodes()
    }

    const initNodes = () => {
      nodes.length = 0
      const layerCount = layers.length
      layers.forEach((count, layerIdx) => {
        const x = (width / (layerCount + 1)) * (layerIdx + 1)
        const spacing = height / (count + 1)
        for (let i = 0; i < count; i++) {
          nodes.push({
            x,
            y: spacing * (i + 1),
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            layer: layerIdx,
          })
        }
      })
    }

    let pulse = 0

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      pulse += 0.02

      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        const margin = 20
        const layerX = (width / (layers.length + 1)) * (n.layer + 1)
        if (Math.abs(n.x - layerX) > margin) n.vx *= -1
        if (n.y < margin || n.y > height - margin) n.vy *= -1
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          if (Math.abs(a.layer - b.layer) !== 1) continue

          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = height * 0.6
          if (dist > maxDist) continue

          const alpha = (1 - dist / maxDist) * (0.15 + Math.sin(pulse + i * 0.3) * 0.08)
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
          grad.addColorStop(0, `rgba(0, 240, 255, ${alpha})`)
          grad.addColorStop(1, `rgba(138, 43, 226, ${alpha})`)

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = grad
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      nodes.forEach((n, i) => {
        const glow = 0.5 + Math.sin(pulse * 2 + i * 0.5) * 0.3
        ctx.beginPath()
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = n.layer === 0 || n.layer === layers.length - 1
          ? `rgba(0, 240, 255, ${glow})`
          : `rgba(138, 43, 226, ${glow * 0.8})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(n.x, n.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 240, 255, ${glow * 0.15})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full opacity-60', className)}
      aria-hidden
    />
  )
}
