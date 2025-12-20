import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "@/components/ui/card";
import {
  healthOutcomes,
  damagePathwayData,
  formatMillions,
} from "@/data/metrics";

export function Health() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      className="py-32 bg-gradient-to-b from-black via-gray-950 to-black"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-emerald-400 font-medium mb-4">
            Better Health For All
          </p>
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
                  <div
                    className="text-3xl font-bold"
                    style={{ color: item.color }}
                  >
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
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              Pathways to Achieve Benefits
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {damagePathwayData.map((d) => (
                <div
                  key={d.pathway}
                  className="text-center p-6 rounded-xl transition-all hover:scale-105"
                  style={{ backgroundColor: `${d.color}15` }}
                >
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${d.color}30` }}
                  >
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                  </div>
                  <h4
                    className="text-lg font-semibold mb-2"
                    style={{ color: d.color }}
                  >
                    {d.pathway}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {d.pathway === "Air Quality Improvement" &&
                      "Reducing emissions and pollutants for cleaner, healthier air"}
                    {d.pathway === "Noise Pollution Reduction" &&
                      "Creating quieter environments through low-emission transport"}
                    {d.pathway === "Active Transport" &&
                      "Promoting walking and cycling for better health outcomes"}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
