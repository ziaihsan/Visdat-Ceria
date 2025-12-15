import { motion, useScroll, useSpring } from "framer-motion"
import { Hero } from "@/components/sections/Hero"
import { Benefits } from "@/components/sections/Benefits"
import { Health } from "@/components/sections/Health"
import { Economic } from "@/components/sections/Economic"
import { Timeline } from "@/components/sections/Timeline"
import { Footer } from "@/components/sections/Footer"

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 origin-left z-50"
      style={{ scaleX }}
    />
  )
}

function Navigation() {
  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 glass rounded-full px-6 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <ul className="flex gap-6 text-sm font-medium">
        {["Overview", "Benefits", "Health", "Economy", "Timeline"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}

export default function App() {
  return (
    <div className="dark bg-black min-h-screen">
      <ScrollProgress />
      <Navigation />
      
      <main>
        <section id="overview">
          <Hero />
        </section>
        
        <section id="benefits">
          <Benefits />
        </section>
        
        <section id="health">
          <Health />
        </section>
        
        <section id="economy">
          <Economic />
        </section>
        
        <section id="timeline">
          <Timeline />
        </section>
        
        <Footer />
      </main>
    </div>
  )
}
