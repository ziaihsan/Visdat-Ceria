import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { GlassCard } from "@/components/ui/card";
import {
  economicData,
  regionalData,
  topLocalAuthorities,
  formatMillions,
  totalPositiveBenefits,
} from "@/data/metrics";

// Declare Leaflet types
interface LeafletMap {
  remove: () => void;
  invalidateSize: () => void;
  setView: (coords: [number, number], zoom: number) => LeafletMap;
}

interface LeafletMarker {
  addTo: (map: LeafletMap) => LeafletMarker;
  bindPopup: (content: string) => LeafletMarker;
  openPopup: () => void;
  setStyle: (style: Record<string, unknown>) => LeafletMarker;
  on: (event: string, handler: () => void) => LeafletMarker;
}

interface LeafletStatic {
  map: (element: HTMLElement) => LeafletMap;
  tileLayer: (
    url: string,
    options: Record<string, unknown>
  ) => { addTo: (map: LeafletMap) => void };
  circleMarker: (
    coords: [number, number],
    options: Record<string, unknown>
  ) => LeafletMarker;
}

declare const L: LeafletStatic;

function Treemap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!chartRef.current || !isInView) return;

    function drawChart() {
      const container = chartRef.current;
      if (!container) return;
      container.innerHTML = "";

      // Ensure container has width
      const width = Math.max(container.clientWidth, 300);
      const height = window.innerWidth < 768 ? 300 : 400; // Smaller height on mobile

      // Create tooltip
      const tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.9)")
        .style("color", "#fff")
        .style("padding", "12px 16px")
        .style("border-radius", "12px")
        .style("font-size", "14px")
        .style("pointer-events", "none")
        .style("z-index", "1000")
        .style("border", "1px solid rgba(16, 185, 129, 0.3)")
        .style("backdrop-filter", "blur(10px)")
        .style("max-width", "280px");

      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("max-width", "100%")
        .style("height", "auto");

      interface TreemapNode {
        value?: number;
        children?: TreemapNode[];
      }

      const root = d3
        .hierarchy<TreemapNode>({ children: economicData as TreemapNode[] })
        .sum((d) => d.value || 0);

      d3.treemap<TreemapNode>().size([width, height]).padding(6).round(true)(
        root
      );

      interface LeafNode extends d3.HierarchyRectangularNode<TreemapNode> {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
        data: {
          name: string;
          value: number;
          color: string;
          description: string;
          detail?: string;
        };
      }

      const leaves = root.leaves() as LeafNode[];

      const cells = svg
        .selectAll(".cell")
        .data(leaves)
        .enter()
        .append("g")
        .attr("class", "cell")
        .attr("transform", (d) => `translate(${d.x0 || 0},${d.y0 || 0})`);

      cells
        .append("rect")
        .attr("width", (d) => (d.x1 || 0) - (d.x0 || 0))
        .attr("height", (d) => (d.y1 || 0) - (d.y0 || 0))
        .attr("fill", (d) => d.data.color)
        .attr("rx", 16)
        .style("opacity", 0)
        .style("cursor", "pointer")
        .on("mouseover", function (event: MouseEvent, d: LeafNode) {
          d3.select(this).transition().duration(200).style("opacity", 1);

          const percentage = (
            (d.data.value / totalPositiveBenefits) *
            100
          ).toFixed(1);
          tooltip.style("visibility", "visible").html(`
          <div>
            <div style="font-weight: 600; margin-bottom: 6px; color: ${
              d.data.color
            }">${d.data.name}</div>
            <div style="font-weight: 700; font-size: 18px; margin-bottom: 4px;">${formatMillions(
              d.data.value
            )}</div>
            <div style="color: #10b981; font-size: 14px; margin-bottom: 8px;">${percentage}% of total</div>
            <div style="color: #9ca3af; font-size: 12px; margin-bottom: 6px;">${
              d.data.description
            }</div>
            ${
              d.data.detail
                ? `<div style="color: #6b7280; font-size: 11px; margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1);">${d.data.detail}</div>`
                : ""
            }
          </div>
        `);
        })
        .on("mousemove", function (event: MouseEvent) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          d3.select(this).transition().duration(200).style("opacity", 0.9);

          tooltip.style("visibility", "hidden");
        })
        .transition()
        .duration(800)
        .delay((_, i) => i * 150)
        .style("opacity", 0.9);

      cells
        .append("text")
        .attr("x", 16)
        .attr("y", 30)
        .attr("fill", "#fff")
        .attr("font-size", window.innerWidth < 768 ? "11px" : "14px")
        .attr("font-weight", "600")
        .style("opacity", 0)
        .style("pointer-events", "none")
        .text((d) => d.data.name)
        .transition()
        .delay((_, i) => 800 + i * 150)
        .style("opacity", 1);

      cells
        .append("text")
        .attr("x", 16)
        .attr("y", window.innerWidth < 768 ? 50 : 58)
        .attr("fill", "#fff")
        .attr("font-size", window.innerWidth < 768 ? "20px" : "28px")
        .attr("font-weight", "700")
        .style("opacity", 0)
        .style("pointer-events", "none")
        .text((d) => formatMillions(d.data.value))
        .transition()
        .delay((_, i) => 900 + i * 150)
        .style("opacity", 1);

      cells
        .append("text")
        .attr("x", 16)
        .attr("y", window.innerWidth < 768 ? 68 : 80)
        .attr("fill", "#fff")
        .attr("font-size", window.innerWidth < 768 ? "9px" : "11px")
        .style("opacity", 0)
        .style("pointer-events", "none")
        .text((d) => d.data.description)
        .each(function (d: LeafNode) {
          // Wrap text on mobile to prevent overflow
          if (window.innerWidth < 768) {
            const text = d3.select(this);
            const words = d.data.description.split(/\s+/);

            if (words.length > 5) {
              text.text(words.slice(0, 5).join(" ") + "...");
            }
          }
        })
        .transition()
        .delay((_, i) => 1000 + i * 150)
        .style("opacity", 0.7);
    }

    drawChart();

    const handleResize = () => {
      drawChart();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isInView]);

  return (
    <div
      ref={chartRef}
      className="w-full overflow-hidden"
      style={{ maxWidth: "100%" }}
    />
  );
}

function RegionalMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mapRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!mapRef.current || !isInView || typeof L === "undefined") return;

    const container = mapRef.current;
    container.innerHTML = "";
    container.style.height = "450px";

    // Create map centered on UK
    const map = L.map(container).setView([54.5, -3.5], 5);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Add markers for each region
    regionalData.forEach((region) => {
      const percentage = ((region.value / totalPositiveBenefits) * 100).toFixed(
        1
      );
      const perCapita = (region.value / (region.population / 1000000)).toFixed(
        1
      );

      const marker = L.circleMarker([region.lat, region.lng], {
        radius: Math.sqrt(region.value) / 50,
        fillColor: region.color,
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7,
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: sans-serif; min-width: 200px;">
          <h3 style="color: ${
            region.color
          }; font-weight: 700; font-size: 16px; margin-bottom: 8px;">${
        region.region
      }</h3>
          <p style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">${formatMillions(
            region.value
          )}</p>
          <p style="color: #10b981; font-size: 14px; margin-bottom: 8px;">${percentage}% of total benefits</p>
          <p style="color: #666; font-size: 12px; margin-bottom: 4px;">Population: ${(
            region.population / 1000000
          ).toFixed(1)}M</p>
          <p style="color: #666; font-size: 12px; margin-bottom: 8px;">Per Capita: £${perCapita}M</p>
          <p style="color: #888; font-size: 11px; font-style: italic;">${
            region.description
          }</p>
        </div>
      `);

      marker.on("mouseover", () => {
        marker.openPopup();
        marker.setStyle({
          fillOpacity: 0.9,
          radius: Math.sqrt(region.value) / 45,
        });
      });

      marker.on("mouseout", () => {
        marker.setStyle({
          fillOpacity: 0.7,
          radius: Math.sqrt(region.value) / 50,
        });
      });
    });

    // Handle window resize
    const handleResize = () => {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      map.remove();
    };
  }, [isInView]);

  return (
    <div ref={mapRef} style={{ borderRadius: "12px", overflow: "hidden" }} />
  );
}

function LocalAuthoritiesMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mapRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!mapRef.current || !isInView || typeof L === "undefined") return;

    const container = mapRef.current;
    container.innerHTML = "";
    container.style.height = "450px";

    // Create map centered on UK
    const map = L.map(container).setView([54.0, -2.5], 6);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Color scale from light to dark green
    const colorScale = d3
      .scaleSequential(d3.interpolateGreens)
      .domain([
        topLocalAuthorities[topLocalAuthorities.length - 1].value,
        topLocalAuthorities[0].value,
      ]);

    // Add markers for top local authorities
    topLocalAuthorities.forEach((la, index) => {
      const perCapita = (la.value / (la.population / 1000000)).toFixed(1);
      const markerColor = colorScale(la.value);

      const marker = L.circleMarker([la.lat, la.lng], {
        radius: 15 - index,
        fillColor: markerColor,
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: sans-serif; min-width: 200px;">
          <h3 style="color: ${markerColor}; font-weight: 700; font-size: 16px; margin-bottom: 8px;">#${
        index + 1
      } ${la.name}</h3>
          <p style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">${formatMillions(
            la.value
          )}</p>
          <p style="color: #666; font-size: 12px; margin-bottom: 4px;">Population: ${(
            la.population / 1000
          ).toFixed(0)}K</p>
          <p style="color: #10b981; font-size: 14px;">Per Capita: £${perCapita}M</p>
        </div>
      `);

      marker.on("mouseover", () => {
        marker.openPopup();
        marker.setStyle({ fillOpacity: 1, radius: 18 - index });
      });

      marker.on("mouseout", () => {
        marker.setStyle({ fillOpacity: 0.8, radius: 15 - index });
      });
    });

    // Handle window resize
    const handleResize = () => {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      map.remove();
    };
  }, [isInView]);

  return (
    <div ref={mapRef} style={{ borderRadius: "12px", overflow: "hidden" }} />
  );
}

export function Economic() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          className="mb-12 overflow-hidden"
        >
          <GlassCard className="p-4 md:p-8 overflow-hidden">
            <h3 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">
              Economic Benefits Breakdown
            </h3>
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
              <h3 className="text-lg font-semibold text-white mb-4">
                Distribution by Nation
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Hover over markers to see detailed information
              </p>
              <RegionalMap />
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <GlassCard className="p-6 h-full">
              <h3 className="text-lg font-semibold text-white mb-4">
                Top 10 Local Authorities
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Interactive map showing highest benefit areas
              </p>
              <LocalAuthoritiesMap />
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
              <p className="text-gray-400 text-sm mb-2">
                Total Economic Benefits
              </p>
              <div className="text-5xl md:text-7xl font-bold text-gradient">
                {formatMillions(totalPositiveBenefits)}
              </div>
              <p className="text-gray-500 mt-2">by 2050</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
