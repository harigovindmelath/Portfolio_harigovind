import { motion } from 'framer-motion'
import { LampContainer } from '@/components/Lamp'
import { scrollToSection } from '@/lib/utils'

export function Hero() {
  return (
    <section id="hero" className="min-h-screen scroll-mt-24">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="mt-8 bg-gradient-to-br from-muted-foreground to-foreground bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Harigovind P
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }}
          className="mx-auto mt-4 max-w-3xl text-center text-xl font-semibold text-foreground/90"
        >
          Turning complex ideas into reliable software.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.8, ease: 'easeInOut' }}
          className="mx-auto mt-3 max-w-3xl text-center text-base text-muted-foreground"
        >
          AI & ML graduate with a strong foundation in software engineering, backend development,
          machine learning, and building production-ready applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, 'projects')}
            className="transform rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-primary/90"
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="transform rounded-lg bg-secondary px-8 py-3 font-semibold text-secondary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-secondary/80"
          >
            Contact Me
          </a>
        </motion.div>
      </LampContainer>
    </section>
  )
}
