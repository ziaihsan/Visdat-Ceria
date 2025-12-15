import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import * as d3 from "d3"
import { GlassCard } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { timelineData, formatMillions } from "@/data/metrics"

const categories = [
  { key: "total", color: "#10b981", label: "Total Benefits" },
  { key: "physicalActivity", color: "#3b82f6", label: "Physical Activity" },
  { key: "airQuality", color: "#8b5cf6", label: "Air Quality" },
  { key: "noise", color: "#f59e0b", label: "Noise Reduction" },
  { key: "excessCold", color: "#ec4899", label: "Excess Cold" }
]

function LineChart({ year }: { year: number }) {
  const chartRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(chartRef, { once: true, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!chartRef.current || !isInView) return

    const container = chartRef.current
    container.innerHTML = ""

    const margin = { top: 30, right: 140, bottom: 50, left: 70 }
    const width = container.clientWidth - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    const svg = d3.select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const x = d3.scaleLinear()
      .domain([2025, 2050])
      .range([0, width])

    const y = d3.scaleLinear()
      .domain([0, 14000])
      .range([height, 0])

    // Grid
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).tickSize(-width).tickFormat(() => ""))
      .selectAll("line")
      .attr("stroke", "#333")
      .attr("stroke-opacity", 0.3)

    svg.selectAll(".grid .domain").remove()

    // Lines
    categories.forEach((cat, idx) => {
      const line = d3.line<typeof timelineData[0]>()
        .x(d => x(d.year))
        .y(d => y(d[cat.key as keyof typeof d] as number))
        .curve(d3.curveMonotoneX)

      const path = svg.append("path")
        .datum(timelineData)
        .attr("fill", "none")
        .attr("stroke", cat.color)
        .attr("stroke-width", cat.key === "total" ? 4 : 2)
        .attr("d", line)

      if (!hasAnimated) {
        const pathLength = path.node()!.getTotalLength()
        path
          .attr("stroke-dasharray", pathLength)
          .attr("stroke-dashoffset", pathLength)
          .transition()
          .duration(2000)
          .delay(idx * 200)
          .attr("stroke-dashoffset", 0)
      }
    })

    // Year indicator
    if (year > 2025) {
      svg.append("line")
        .attr("x1", x(year))
        .attr("x2", x(year))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
        .attr("opacity", 0.5)

      // Show values at year
      const yearData = timelineData.find(d => d.year <= year)
      if (yearData) {
        svg.append("text")
          .attr("x", x(year) + 10)
          .attr("y", 20)
          .attr("fill", "#10b981")
          .attr("font-size", "14px")
          .attr("font-weight", "700")
          .text(formatMillions(yearData.total))
      }
    }

    // Axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(6))
      .attr("color", "#666")

    svg.append("g")
      .call(d3.axisLeft(y).tickFormat(d => `£${(d as number) / 1000}B`).ticks(7))
      .attr("color", "#666")

    // Y axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -55)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "#666")
      .attr("font-size", "12px")
      .text("Annual Benefits (GBP)")

    // Legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width + 15}, 0)`)

    categories.forEach((cat, i) => {
      const g = legend.append("g")
        .attr("transform", `translate(0, ${i * 28})`)

      g.append("rect")
        .attr("width", 20)
        .attr("height", cat.key === "total" ? 4 : 2)
        .attr("fill", cat.color)
        .attr("rx", 1)

      g.append("text")
        .attr("x", 28)
        .attr("y", 4)
        .attr("fill", "#9ca3af")
        .attr("font-size", "10px")
        .text(cat.label)
    })

    if (!hasAnimated) setHasAnimated(true)

  }, [isInView, year, hasAnimated])

  return <div ref={chartRef} className="w-full" />
}

export function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [year, setYear] = useState(2025)
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setYear(prev => {
          if (prev >= 2050) {
            setIsPlaying(false)
            return 2025
          }
          return prev + 1
        })
      }, 150)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const currentData = timelineData.find(d => d.year <= year) || timelineData[0]

  return (
    <section className="py-32 bg-gradient-to-b from-black via-gray-950 to-black" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-emerald-400 font-medium mb-4">Long-Term Impact</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Benefits That
            <br />
            <span className="text-gradient">Grow Over Time</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See how annual co-benefits grow from 2025 to 2050
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlassCard className="p-8">
            <LineChart year={year} />
            
            <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
              <Button
                variant={isPlaying ? "secondary" : "default"}
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="gap-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Pause" : "Play Animation"}
              </Button>
              
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={2025}
                  max={2050}
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-48 h-2 bg-gray-700 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-emerald-500
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:hover:scale-125"
                />
                <span className="text-3xl font-bold text-gradient min-w-[80px]">{year}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center p-4 rounded-xl bg-emerald-500/10">
                <div className="text-2xl font-bold text-emerald-400">{formatMillions(currentData.physicalActivity)}</div>
                <div className="text-xs text-gray-400">Physical Activity</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-blue-500/10">
                <div className="text-2xl font-bold text-blue-400">{formatMillions(currentData.airQuality)}</div>
                <div className="text-xs text-gray-400">Air Quality</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-purple-500/10">
                <div className="text-2xl font-bold text-purple-400">{formatMillions(currentData.noise)}</div>
                <div className="text-xs text-gray-400">Noise Reduction</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-pink-500/10">
                <div className="text-2xl font-bold text-pink-400">{formatMillions(currentData.excessCold)}</div>
                <div className="text-xs text-gray-400">Excess Cold</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <GlassCard className="hover:border-emerald-500/30">
            <h3 className="text-xl font-bold text-emerald-400 mb-3">Immediate Benefits</h3>
            <p className="text-gray-400">
              In 2025, annual benefits total £1.9B, primarily from physical activity. Even early action delivers measurable results.
            </p>
          </GlassCard>
          <GlassCard className="hover:border-cyan-500/30">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Peak Impact by 2050</h3>
            <p className="text-gray-400">
              By 2050, annual benefits reach £12.3B as air quality improvements and infrastructure investments fully mature.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
