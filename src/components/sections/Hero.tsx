import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { summaryStats, formatMillions, totalPositiveBenefits } from "@/data/metrics"

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  opacity: number
}

export function Hero() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const width = window.innerWidth
    const height = window.innerHeight

    const svg = d3.select(canvasRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("position", "absolute")
      .style("top", "0")
      .style("left", "0")

    const particles: Particle[] = d3.range(60).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1
    }))

    const gradient = svg.append("defs")
      .append("radialGradient")
      .attr("id", "particleGradient")

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#10b981")
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#3b82f6")

    const circles = svg.selectAll<SVGCircleElement, Particle>("circle")
      .data(particles)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", "url(#particleGradient)")
      .attr("opacity", d => d.opacity)

    function animate() {
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      })
      circles.attr("cx", d => d.x).attr("cy", d => d.y)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      svg.remove()
    }
  }, [])

  const stats = [
    { value: summaryStats.totalSmallAreas.toLocaleString(), label: "UK Small Areas" },
    { value: (summaryStats.totalPopulation / 1000000).toFixed(1) + "M", label: "Population Covered" },
    { value: formatMillions(totalPositiveBenefits), label: "Total Benefits" }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      <div ref={canvasRef} className="absolute inset-0 opacity-50" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
        >
          <motion.p
            className="text-emerald-400 font-medium mb-4 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            UK Climate Action Co-Benefits {summaryStats.yearsSpan}
          </motion.p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            Your Future
            <br />
            <span className="text-gradient">Starts Now</span>
          </h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            What if fighting climate change made your life better?
          </motion.p>

          <motion.div
            className="flex flex-col items-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-2xl md:text-3xl font-semibold text-white">
              This isn't about sacrifice.
            </p>
            <p className="text-lg text-gray-400">
              It's about cleaner air, healthier bodies, and thriving communities.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-4 md:p-6"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-2xl md:text-4xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Button variant="apple" size="lg" className="gap-2">
            Explore the Data
          </Button>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-gray-500"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}
