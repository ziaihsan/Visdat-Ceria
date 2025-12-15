import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import * as d3 from "d3"
import { GlassCard } from "@/components/ui/card"
import { benefitsData, totalPositiveBenefits, formatMillions, summaryStats } from "@/data/metrics"

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const start = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - start
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      setCount(value * easeProgress)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {prefix}{count >= 1000 ? (count / 1000).toFixed(1) : count.toFixed(1)}{count >= 1000 ? "B" : "M"}{suffix}
    </span>
  )
}

function BarChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!chartRef.current || !isInView) return

    const container = chartRef.current
    container.innerHTML = ""

    const margin = { top: 20, right: 100, bottom: 20, left: 140 }
    const width = Math.min(container.clientWidth, 700) - margin.left - margin.right
    const height: number = 380 - margin.top - margin.bottom

    const svg = d3.select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const x = d3.scaleLinear()
      .domain([0, d3.max(benefitsData, d => d.value)!])
      .range([0, width])

    const y = d3.scaleBand()
      .domain(benefitsData.map(d => d.name))
      .range([0, height])
      .padding(0.35)

    svg.selectAll(".bar")
      .data(benefitsData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", d => y(d.name)!)
      .attr("height", y.bandwidth())
      .attr("fill", d => d.color)
      .attr("rx", y.bandwidth() / 2)
      .attr("width", 0)
      .transition()
      .duration(1000)
      .delay((_, i) => i * 100)
      .attr("width", d => x(d.value))

    svg.selectAll(".label")
      .data(benefitsData)
      .enter()
      .append("text")
      .attr("x", -10)
      .attr("y", d => y(d.name)! + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .attr("fill", "#9ca3af")
      .attr("font-size", "12px")
      .text(d => d.name)

    svg.selectAll(".value")
      .data(benefitsData)
      .enter()
      .append("text")
      .attr("x", d => x(d.value) + 8)
      .attr("y", d => y(d.name)! + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("fill", "#fff")
      .attr("font-size", "13px")
      .attr("font-weight", "600")
      .style("opacity", 0)
      .text(d => formatMillions(d.value))
      .transition()
      .delay((_, i) => 1000 + i * 100)
      .style("opacity", 1)

  }, [isInView])

  return <div ref={containerRef}><div ref={chartRef} className="w-full" /></div>
}

function PieChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!chartRef.current || !isInView) return

    const container = chartRef.current
    container.innerHTML = ""

    const width = 300
    const height = 300
    const radius = Math.min(width, height) / 2 - 10

    const svg = d3.select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)

    const pie = d3.pie<typeof benefitsData[0]>()
      .value(d => d.value)
      .sort(null)

    const arc = d3.arc<d3.PieArcDatum<typeof benefitsData[0]>>()
      .innerRadius(radius * 0.55)
      .outerRadius(radius)

    const arcs = svg.selectAll(".arc")
      .data(pie(benefitsData))
      .enter()
      .append("g")

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => d.data.color)
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .delay((_, i) => i * 80)
      .style("opacity", 1)
      .attrTween("d", function(d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
        return (t) => arc(i(t))!
      })

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.3em")
      .attr("fill", "#9ca3af")
      .attr("font-size", "12px")
      .text("Total Benefits")

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("fill", "#10b981")
      .attr("font-size", "18px")
      .attr("font-weight", "700")
      .text(formatMillions(totalPositiveBenefits))

  }, [isInView])

  return <div ref={containerRef}><div ref={chartRef} className="flex justify-center" /></div>
}

export function Benefits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-32 bg-black" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-emerald-400 font-medium mb-4">The Facts Speak</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            5 Benefits of Fighting
            <br />
            <span className="text-gradient">Climate Change</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Every co-benefit measured across {summaryStats.totalSmallAreas.toLocaleString()} UK small areas
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Benefits Breakdown (2025-2050)</h3>
              <BarChart />
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            <GlassCard className="p-6 flex-1">
              <h3 className="text-lg font-semibold text-white mb-4">Distribution</h3>
              <PieChart />
            </GlassCard>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <GlassCard className="inline-block px-16 py-10 border-emerald-500/30">
            <p className="text-gray-400 text-sm mb-2">Total Co-Benefits</p>
            <div className="text-5xl md:text-7xl font-bold text-gradient">
              £<AnimatedCounter value={totalPositiveBenefits} />
            </div>
            <p className="text-gray-500 mt-2">Across {summaryStats.totalSmallAreas.toLocaleString()} UK communities by 2050</p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
