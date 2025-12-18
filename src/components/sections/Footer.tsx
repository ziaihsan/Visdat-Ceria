import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { cumulativeData, summaryStats, formatMillions } from "@/data/metrics";

function FinalChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!chartRef.current || !isInView) return;

    const container = chartRef.current;
    container.innerHTML = "";

    const width = Math.min(container.clientWidth, 700);
    const height = 180;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(cumulativeData.map((d) => d.year.toString()))
      .range([50, width - 50])
      .padding(0.3);

    const maxR = 50;
    const rScale = d3
      .scaleSqrt()
      .domain([0, d3.max(cumulativeData, (d) => d.cumulative)!])
      .range([15, maxR]);

    const colorScale = d3
      .scaleLinear<string>()
      .domain([0, cumulativeData.length - 1])
      .range(["#334155", "#10b981"]);

    const groups = svg
      .selectAll(".group")
      .data(cumulativeData)
      .enter()
      .append("g")
      .attr(
        "transform",
        (d) =>
          `translate(${x(d.year.toString())! + x.bandwidth() / 2}, ${
            height / 2
          })`
      );

    groups
      .append("circle")
      .attr("r", 0)
      .attr("fill", (_, i) => colorScale(i))
      .attr("opacity", 0.9)
      .transition()
      .duration(800)
      .delay((_, i) => i * 100)
      .attr("r", (d) => rScale(d.cumulative));

    groups
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "#fff")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .style("opacity", 0)
      .text((d) => formatMillions(d.cumulative))
      .transition()
      .delay((_, i) => 800 + i * 100)
      .style("opacity", 1);

    groups
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", maxR + 20)
      .attr("fill", "#9ca3af")
      .attr("font-size", "12px")
      .text((d) => d.year);
  }, [isInView]);

  return <div ref={chartRef} className="w-full flex justify-center" />;
}

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer className="py-32 bg-black relative overflow-hidden" ref={ref}>
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-gradient">The Future</span>
            <br />
            <span className="text-white">We Create Together</span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Climate action means cleaner air, stronger economies, and healthier
            communities for everyone.
          </motion.p>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-500 text-sm mb-4">Benefits Over Time</p>
            <FinalChart />
          </motion.div>

          <motion.div
            className="pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-gray-500 text-sm mb-2">
              Data source: UK Co-Benefits Dataset (Level 3) —{" "}
              {summaryStats.yearsSpan}
            </p>
            <p className="text-gray-600 text-sm">
              {summaryStats.totalSmallAreas.toLocaleString()} small areas
              analyzed • {(summaryStats.totalPopulation / 1000000).toFixed(1)}M
              population covered
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
