import { motion, useInView } from "framer-motion"
import { useRef, useEffect } from "react"
import * as d3 from "d3"
import { GlassCard } from "@/components/ui/card"
import { economicData, regionalData, topLocalAuthorities, formatMillions, totalPositiveBenefits } from "@/data/metrics"

function Treemap() {
  const chartRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(chartRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!chartRef.current || !isInView) return

    const container = chartRef.current
    container.innerHTML = ""

    const width = container.clientWidth
    const height = 400

    const svg = d3.select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const root = d3.hierarchy<any>({ children: economicData })
      .sum(d => d.value || 0)

    d3.treemap()
      .size([width, height])
      .padding(6)
      .round(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root as any)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const leaves = root.leaves() as any[]

    const cells = svg.selectAll(".cell")
      .data(leaves)
      .enter()
      .append("g")
      .attr("class", "cell")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("transform", (d: any) => `translate(${d.x0 || 0},${d.y0 || 0})`)

    cells.append("rect")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("width", (d: any) => (d.x1 || 0) - (d.x0 || 0))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("height", (d: any) => (d.y1 || 0) - (d.y0 || 0))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("fill", (d: any) => d.data.color)
      .attr("rx", 16)
      .style("opacity", 0)
      .transition()
      .duration(800)
      .delay((_, i) => i * 150)
      .style("opacity", 0.9)

    cells.append("text")
      .attr("x", 16)
      .attr("y", 30)
      .attr("fill", "#fff")
      .attr("font-size", "14px")
      .attr("font-weight", "600")
      .style("opacity", 0)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .text((d: any) => d.data.name)
      .transition()
      .delay((_, i) => 800 + i * 150)
      .style("opacity", 1)

    cells.append("text")
      .attr("x", 16)
      .attr("y", 58)
      .attr("fill", "#fff")
      .attr("font-size", "28px")
      .attr("font-weight", "700")
      .style("opacity", 0)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .text((d: any) => formatMillions(d.data.value))
      .transition()
      .delay((_, i) => 900 + i * 150)
      .style("opacity", 1)

    cells.append("text")
      .attr("x", 16)
      .attr("y", 80)
      .attr("fill", "#fff")
      .attr("font-size", "11px")
      .style("opacity", 0)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .text((d: any) => d.data.description)
      .transition()
      .delay((_, i) => 1000 + i * 150)
      .style("opacity", 0.7)

  }, [isInView])

  return <div ref={chartRef} className="w-full" />
}

function RegionalBarChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(chartRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!chartRef.current || !isInView) return

    const container = chartRef.current
    container.innerHTML = ""

    const margin = { top: 20, right: 80, bottom: 20, left: 120 }
    const width = container.clientWidth - margin.left - margin.right
    const height = 150

    const svg = d3.select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const x = d3.scaleLinear()
      .domain([0, d3.max(regionalData, d => d.value)!])
      .range([0, width])

    const y = d3.scaleBand()
      .domain(regionalData.map(d => d.region))
      .range([0, height])
      .padding(0.4)

    svg.selectAll(".bar")
      .data(regionalData)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", d => y(d.region)!)
      .attr("height", y.bandwidth())
      .attr("fill", d => d.color)
      .attr("rx", y.bandwidth() / 2)
      .attr("width", 0)
      .transition()
      .duration(1000)
      .delay((_, i) => i * 150)
      .attr("width", d => x(d.value))

    svg.selectAll(".label")
      .data(regionalData)
      .enter()
      .append("text")
      .attr("x", -10)
      .attr("y", d => y(d.region)! + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .attr("fill", "#9ca3af")
      .attr("font-size", "12px")
      .text(d => d.region)

    svg.selectAll(".value")
      .data(regionalData)
      .enter()
      .append("text")
      .attr("x", d => x(d.value) + 8)
      .attr("y", d => y(d.region)! + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("fill", "#fff")
      .attr("font-size", "12px")
      .attr("font-weight", "600")
      .style("opacity", 0)
      .text(d => formatMillions(d.value))
      .transition()
      .delay((_, i) => 1000 + i * 150)
      .style("opacity", 1)

  }, [isInView])

  return <div ref={chartRef} className="w-full" />
}

export function Economic() {
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
          <p className="text-emerald-400 font-medium mb-4">Economic Impact</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Good for the Planet.
            <br />
            <span className="text-gradient">Great for the Economy.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            By 2050, net-zero policies will generate billions in co-benefits.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <GlassCard className="p-8">
            <h3 className="text-lg font-semibold text-white mb-6">Economic Benefits Breakdown</h3>
            <Treemap />
          </GlassCard>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GlassCard className="p-6 h-full">
              <h3 className="text-lg font-semibold text-white mb-4">By Nation</h3>
              <RegionalBarChart />
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <GlassCard className="p-6 h-full">
              <h3 className="text-lg font-semibold text-white mb-4">Top Local Authorities</h3>
              <div className="space-y-3">
                {topLocalAuthorities.slice(0, 5).map((la, i) => (
                  <div key={la.name} className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{i + 1}. {la.name}</span>
                    <span className="text-emerald-400 font-semibold">{formatMillions(la.value)}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="inline-block rounded-[2rem] bg-gradient-to-r from-emerald-500 to-cyan-500 p-[2px]">
            <div className="rounded-[calc(2rem-2px)] bg-black px-16 py-10">
              <p className="text-gray-400 text-sm mb-2">Total Economic Benefits</p>
              <div className="text-5xl md:text-7xl font-bold text-gradient">
                {formatMillions(totalPositiveBenefits)}
              </div>
              <p className="text-gray-500 mt-2">by 2050</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
