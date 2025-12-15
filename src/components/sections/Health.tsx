import { motion, useInView, Variants } from "framer-motion"
import { useRef, useEffect } from "react"
import * as d3 from "d3"
import { GlassCard } from "@/components/ui/card"
import { healthOutcomes, damagePathwayData, formatMillions } from "@/data/metrics"

interface BubbleNode extends d3.SimulationNodeDatum {
  name: string
  value: number
  color: string
}

function BubbleChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(chartRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!chartRef.current || !isInView) return

    const container = chartRef.current
    container.innerHTML = ""

    const width = container.clientWidth
    const height = 380

    const bubbleData: BubbleNode[] = damagePathwayData.map(d => ({
      name: d.pathway,
      value: Math.sqrt(d.value / 1000) * 8, // Better scaling for visibility
      color: d.color
    }))

    const svg = d3.select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    const simulation = d3.forceSimulation<BubbleNode>(bubbleData)
      .force("x", d3.forceX(width / 2).strength(0.2))
      .force("y", d3.forceY(height / 2).strength(0.2))
      .force("collide", d3.forceCollide<BubbleNode>((d) => d.value + 15))
      .stop()

    for (let i = 0; i < 200; i++) simulation.tick()

    const bubbles = svg.selectAll(".bubble")
      .data(bubbleData)
      .enter()
      .append("g")
      .attr("class", "bubble")
      .attr("transform", d => `translate(${d.x || 0},${d.y || 0})`)

    bubbles.append("circle")
      .attr("r", 0)
      .attr("fill", d => d.color)
      .attr("opacity", 0.85)
      .transition()
      .duration(1000)
      .delay((_, i) => i * 150)
      .attr("r", d => d.value)

    bubbles.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.3em")
      .attr("fill", "#fff")
      .attr("font-size", "10px")
      .attr("font-weight", "600")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .text(d => d.name.split(" ")[0])
      .transition()
      .delay((_, i) => 1000 + i * 150)
      .style("opacity", 1)

    bubbles.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("fill", "#fff")
      .attr("font-size", "9px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .text(d => {
        const original = damagePathwayData.find(p => p.pathway === d.name)
        return original ? formatMillions(original.value) : ""
      })
      .transition()
      .delay((_, i) => 1100 + i * 150)
      .style("opacity", 0.8)

  }, [isInView])

  return <div ref={chartRef} className="w-full h-[380px]" />
}

export function Health() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section className="py-32 bg-gradient-to-b from-black via-gray-950 to-black" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-emerald-400 font-medium mb-4">Better Health For All</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Healthy Planet,
            <br />
            <span className="text-gradient">Healthy People.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Taking care of our planet means taking care of our health.
            <br />
            £198.3B in benefits by 2050.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {healthOutcomes.map((item) => (
            <motion.div key={item.name} variants={cardVariants}>
              <GlassCard className="h-full hover:border-emerald-500/30 group flex flex-col">
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all">
                  {item.name}
                </h3>
                <p className="text-gray-400 mb-6 text-sm flex-grow">
                  {item.description}
                </p>
                <div 
                  className="rounded-xl p-4 mt-auto text-center"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <div className="text-3xl font-bold" style={{ color: item.color }}>
                    {formatMillions(item.value)}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <GlassCard className="p-8">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Damage Pathway Distribution</h3>
            <BubbleChart />
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {damagePathwayData.map(d => (
                <div key={d.pathway} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-gray-400">{d.pathway}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
