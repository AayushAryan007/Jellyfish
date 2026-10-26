import { useEffect, useRef } from 'react'

// Seeded random so each jellyfish keeps the same anatomy between renders.
function seeded(seed) {
  let s = seed % 2147483647 || 1
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}

// A procedural, real-time jellyfish: pulsing bell, lagging tentacles, frilled oral arms.
// Used as the live fallback until the Higgsfield clips are dropped in.
export default function Jellyfish({ className = '', seed = 7, speed = 1, intensity = 1, tentacles = 16, motes = 40 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const rand = seeded(seed)
    const tents = Array.from({ length: tentacles }, (_, i) => ({
      pos: Math.max(-1, Math.min(1, (i / (tentacles - 1)) * 2 - 1 + (rand() - 0.5) * 0.12)),
      len: 1.8 + rand() * 3.2,
      phase: rand() * Math.PI * 2,
      amp: 0.5 + rand() * 0.9,
      width: 0.35 + rand() * 0.7,
    }))
    const arms = Array.from({ length: 5 }, (_, i) => ({ pos: (i / 4) * 0.56 - 0.28, len: 2.1 + rand() * 1.4, phase: rand() * 6, frill: 0.6 + rand() * 0.8 }))
    const dust = Array.from({ length: motes }, () => ({ x: rand(), y: rand(), s: rand() * 1.3 + 0.3, v: 0.004 + rand() * 0.01, a: rand() * 0.5 + 0.1 }))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const offset = rand() * 20

    let W = 0, H = 0, raf = 0, visible = true
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const b = canvas.getBoundingClientRect()
      W = b.width; H = b.height
      canvas.width = Math.max(1, W * dpr); canvas.height = Math.max(1, H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduce) draw(performance.now())
    }

    const strokeGradient = (y0, y1, a, rgb = '255,110,80') => {
      const g = ctx.createLinearGradient(0, y0, 0, y1)
      g.addColorStop(0, `rgba(${rgb},${a})`)
      g.addColorStop(1, `rgba(${rgb},0)`)
      return g
    }

    function draw(now) {
      raf = 0
      const t = reduce ? 3 : (now / 1000) * speed + offset
      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'

      const R = Math.min(W * 0.3, H * 0.15)
      const pulse = Math.sin(t * 1.4)
      const squeeze = Math.max(0, pulse)
      const cx = W / 2 + Math.sin(t * 0.27) * R * 0.1
      const cy = H * 0.2 - Math.sin(t * 1.4 - 1) * R * 0.09
      const w = R * (1 - 0.14 * squeeze)
      const h = R * (0.76 + 0.14 * squeeze)
      const rim = cy + h * 0.12
      const lean = Math.sin(t * 0.27 - 0.8) * R * 0.25

      // Suspended particles drifting downward as the animal rises.
      for (const m of dust) {
        const y = (((m.y + t * m.v * 0.3) % 1) + 1) % 1
        ctx.fillStyle = `rgba(255,110,80,${m.a * intensity * 0.5})`
        ctx.beginPath(); ctx.arc(m.x * W, y * H, m.s, 0, Math.PI * 2); ctx.fill()
      }

      // Halo of light the bell throws into the water.
      const hy = cy - h * 0.3
      // Glow must fade out before it reaches any canvas edge, or the edge shows as a hard rectangle.
      const haloR = Math.max(1, Math.min(R * 2.8, cx, W - cx, hy, H - hy) * 0.95)
      const halo = ctx.createRadialGradient(cx, hy, 0, cx, hy, haloR)
      halo.addColorStop(0, `rgba(230,57,43,${0.32 * intensity})`)
      halo.addColorStop(1, 'rgba(230,57,43,0)')
      ctx.fillStyle = halo
      ctx.fillRect(0, 0, W, H)

      // Tentacles: splay out from the margin, then hang; a travelling wave that grows toward the tips.
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      for (const tn of tents) {
        const bx = cx + tn.pos * w * 0.96
        const by = rim - Math.cos(tn.pos * Math.PI * 0.5) * h * 0.08
        const segs = 34, L = R * tn.len, step = L / segs
        ctx.beginPath(); ctx.moveTo(bx, by)
        for (let i = 1; i <= segs; i++) {
          const k = i / segs
          const splay = tn.pos * R * 0.42 * Math.sqrt(k) * (1 + 0.35 * squeeze)
          const wave = Math.sin(t * 1.4 - i * 0.19 + tn.phase) * R * 0.15 * tn.amp * k
          const wave2 = Math.sin(t * 0.7 - i * 0.07 + tn.phase * 2) * R * 0.1 * k * k
          const y = by + i * step * (1 - 0.08 * squeeze)
          ctx.lineTo(bx + splay - lean * k * k + wave + wave2, y)
        }
        ctx.strokeStyle = strokeGradient(by, by + L, (0.28 + 0.3 * tn.amp / 1.4) * intensity)
        ctx.lineWidth = tn.width * Math.max(0.6, R / 110)
        ctx.stroke()
      }

      // Oral arms: filled, ruffled ribbons, the dense red mass beneath the bell.
      for (const a of arms) {
        const segs = 40, L = R * a.len * 1.25
        const left = [], right = []
        for (let i = 0; i <= segs; i++) {
          const k = i / segs
          const y = rim - h * 0.12 + i * (L / segs)
          const x = cx + a.pos * w * (1 - k * 0.3) - lean * k * 0.7 + Math.sin(t * 1.1 - i * 0.22 + a.phase) * R * 0.16 * k
          const width = R * 0.075 * (1 - k * 0.75) * (1 + 0.35 * Math.sin(t * 0.9 + a.phase))
          const ruffle = 1 + 0.55 * Math.sin(i * 2.1 + t * 2.2 + a.phase) * Math.sin(i * 0.7 + a.phase)
          left.push([x - width * ruffle, y]); right.push([x + width * (2 - ruffle), y])
        }
        ctx.beginPath(); ctx.moveTo(left[0][0], left[0][1])
        for (const [x, y] of left) ctx.lineTo(x, y)
        for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(right[i][0], right[i][1])
        ctx.closePath()
        const g = ctx.createLinearGradient(0, rim, 0, rim + L)
        g.addColorStop(0, `rgba(255,95,65,${0.42 * intensity})`)
        g.addColorStop(0.55, `rgba(230,57,43,${0.22 * intensity})`)
        g.addColorStop(1, 'rgba(230,57,43,0)')
        ctx.fillStyle = g; ctx.fill()
        // bright frilled edges
        for (const edge of [left, right]) {
          ctx.beginPath(); edge.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
          ctx.strokeStyle = strokeGradient(rim, rim + L, 0.38 * intensity, '255,140,110')
          ctx.lineWidth = Math.max(0.6, R / 140); ctx.stroke()
        }
      }

      // Bell: rounded dome with a softly scalloped margin.
      const scallops = 14
      const bellPath = () => {
        ctx.beginPath()
        ctx.moveTo(cx - w, rim)
        ctx.bezierCurveTo(cx - w * 1.02, cy - h * 0.55, cx - w * 0.62, cy - h * 1.18, cx, cy - h * 1.12)
        ctx.bezierCurveTo(cx + w * 0.62, cy - h * 1.18, cx + w * 1.02, cy - h * 0.55, cx + w, rim)
        for (let i = scallops; i >= 0; i--) {
          const k = i / scallops
          const x = cx - w + 2 * w * k
          const y = rim - Math.sin(k * Math.PI) * h * 0.16 + Math.sin(k * Math.PI * scallops + t * 2) * h * 0.025
          ctx.lineTo(x, y)
        }
        ctx.closePath()
      }
      bellPath()
      const bell = ctx.createRadialGradient(cx, cy - h * 0.6, R * 0.05, cx, cy - h * 0.25, w * 1.2)
      bell.addColorStop(0, `rgba(255,160,130,${0.62 * intensity})`)
      bell.addColorStop(0.5, `rgba(230,57,43,${0.42 * intensity})`)
      bell.addColorStop(1, `rgba(120,12,8,${0.2 * intensity})`)
      ctx.fillStyle = bell
      ctx.fill()

      // Soft inner glow seen through the translucent bell.
      const core = ctx.createRadialGradient(cx, cy - h * 0.4, 0, cx, cy - h * 0.4, w * 0.55)
      core.addColorStop(0, `rgba(255,170,140,${(0.28 + 0.08 * squeeze) * intensity})`)
      core.addColorStop(1, 'rgba(255,120,90,0)')
      ctx.fillStyle = core
      ctx.beginPath(); ctx.ellipse(cx, cy - h * 0.4, w * 0.6, h * 0.42, 0, 0, Math.PI * 2); ctx.fill()

      // Bright margin and a soft highlight across the dome.
      ctx.beginPath()
      for (let i = 0; i <= scallops; i++) {
        const k = i / scallops
        const x = cx - w + 2 * w * k
        const y = rim - Math.sin(k * Math.PI) * h * 0.16 + Math.sin(k * Math.PI * scallops + t * 2) * h * 0.025
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
      }
      ctx.strokeStyle = `rgba(255,170,140,${0.5 * intensity})`; ctx.lineWidth = Math.max(1, R / 70); ctx.stroke()
      ctx.beginPath(); ctx.ellipse(cx - w * 0.12, cy - h * 0.55, w * 0.62, h * 0.48, -0.1, Math.PI * 1.12, Math.PI * 1.7)
      ctx.strokeStyle = `rgba(255,215,195,${0.2 * intensity})`; ctx.lineWidth = Math.max(1, R / 45); ctx.stroke()

      if (visible && !reduce) raf = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf && !reduce) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)
    if (!reduce) raf = requestAnimationFrame(draw)

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [seed, speed, intensity, tentacles, motes])

  return <canvas ref={ref} className={`soft-edges absolute inset-0 block h-full w-full ${className}`} aria-hidden="true" />
}
