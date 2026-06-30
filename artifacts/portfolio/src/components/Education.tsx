import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, GraduationCap } from '@/components/icons/Icons'
import { Timeline } from '@/components/ui/timeline'
import { sectionClass } from '@/lib/utils'

const educationData = [
  {
    id: '1',
    title: 'B.Tech in Artificial Intelligence and Machine Learning',
    description: 'YOUR_COLLEGE_NAME — 2022 to 2026',
    timestamp: '2026',
    status: 'active' as const,
    icon: <GraduationCap className="h-3 w-3" />,
  },
]

export function Education() {
  return (
    <section id="education" className={sectionClass}>
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold md:text-4xl"
        >
          Education
        </motion.h2>

        <div className="mx-auto max-w-3xl">
          <Timeline items={educationData} timestampPosition="bottom" showTimestamps />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <h3 className="mb-6 text-center text-2xl font-semibold">Research and Publication</h3>

          <div className="rounded-lg border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
            <div className="flex gap-4">
              <BookOpen className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  IEEE Conference
                </span>
                <p className="mt-2 font-semibold text-foreground">
                  Real-Time Water Leak and Usage Monitoring for Smart Apartments using IoT Flow
                  Sensors and LSTM-based Leak Detection
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Presented at IEEE International Conference IDCIoT 2026
                </p>
                <a
                  href="https://doi.org/10.1109/IDCIoT67589.2026.11455854"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  DOI: 10.1109/IDCIoT67589.2026.11455854 — View on IEEE Xplore
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
