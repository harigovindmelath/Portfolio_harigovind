import { motion } from 'framer-motion'
import { Brain, Cpu, Server, Download } from '@/components/icons/Icons'
import { sectionClass } from '@/lib/utils'

const whatIDoCards = [
  {
    icon: Brain,
    title: 'AI Systems & LLM Applications',
    description:
      'Building intelligent applications with LLMs, RAG pipelines, semantic search, reranking, and retrieval techniques focused on accuracy, scalability, and real-world use cases.',
  },
  {
    icon: Cpu,
    title: 'Machine Learning & Computer Vision',
    description:
      'Developing machine learning, computer vision, and NLP solutions using PyTorch, OpenCV, TensorFlow, and scikit-learn for classification, detection, and predictive tasks.',
  },
  {
    icon: Server,
    title: 'Backend Engineering',
    description:
      'Building scalable backend services and APIs with Python, FastAPI, Django, and SQL while integrating machine learning models into reliable production-ready applications.',
  },
]

const lookingFor = [
  'Software Engineer',
  'Backend Engineer',
  'AI Engineer',
  'Machine Learning Engineer',
]

export function About() {
  return (
    <section id="about" className={sectionClass}>
      <div className="container mx-auto max-w-3xl text-center">
        {/* Replace src with /profile.jpg after adding your photo to public/profile.jpg */}
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          src="/IMG_6230.PNG"
          alt="Harigovind P"
          className="mx-auto mb-8 h-48 w-48 rounded-full border-4 border-border object-cover shadow-lg"
        />

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="mb-4 text-lg text-muted-foreground"
        >
          AI &amp; ML graduate with a strong foundation in software engineering, backend
          development, and machine learning. Experienced in building production-ready applications,
          intelligent systems, and modern AI solutions from LLM-powered workflows to scalable
          backend infrastructure.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-10 text-lg text-muted-foreground"
        >
          I enjoy turning complex ideas into reliable software from scalable backend services and
          intelligent AI applications to modern machine learning systems built with performance and
          maintainability in mind.
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-8 text-2xl font-semibold"
        >
          What I Do
        </motion.h3>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {whatIDoCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="rounded-lg border border-border bg-background/50 p-6 text-left shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg"
            >
              <card.icon className="mb-4 h-8 w-8 text-primary" />
              <h4 className="mb-2 text-lg font-semibold">{card.title}</h4>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mb-4 text-xl font-semibold"
        >
          Looking For
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          {lookingFor.map((role) => (
            <span
              key={role}
              className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            >
              {role}
            </span>
          ))}
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          href="/resume.pdf"
          download="Harigovind P - Resume.pdf"
          className="inline-flex transform items-center gap-3 rounded-lg bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-primary/90"
        >
          <Download className="h-5 w-5" />
          Download Resume
        </motion.a>
      </div>
    </section>
  )
}
