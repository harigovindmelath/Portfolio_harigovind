import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProjectCard, ProjectModal, type Project } from '@/components/ProjectModal'
import { sectionClass } from '@/lib/utils'

const GITHUB_REPOS_URL = 'https://github.com/harigovindmelath?tab=repositories'

const projects: Project[] = [
  {
    id: 'akis',
    title: 'Adaptive Knowledge Intelligence System',
    badge: 'Flagship System',
    description:
      'Production-grade self-healing RAG pipeline with modular ingestion, hybrid FAISS and BM25 retrieval, cross-encoder reranking, and LLM generation. Deployed on CPU with full observability via structured JSON logging.',
    image: '',
    tags: ['RAG', 'LLM', 'FAISS', 'Python', 'FastAPI', 'BM25'],
    details: [
      'Implemented an automated confidence-scoring and query-rewriting loop that detects low retrieval quality, rewrites queries via the LLM, and retries before falling back to an uncertainty-aware response.',
      'Built a semantic hallucination detection layer that splits generated answers into atomic claims and verifies each against retrieved context using cosine similarity, emitting structured JSON for downstream auditability.',
      'Exposed as a FastAPI service with /query, /ingest, and /metrics endpoints, enabling background PDF re-indexing, live query serving, and lightweight performance monitoring.',
      'Designed a modular ingestion pipeline supporting PDF and text documents with chunking, embedding, and dual-index storage in FAISS and BM25.',
    ],
    githubLink: 'https://github.com/harigovindmelath/Adaptive-Knowledge-Intelligence-System',
  },
  {
    id: 'trackhire',
    title: 'TrackHire',
    badge: 'Featured',
    description:
      'A Spring Boot REST API that streamlines job application tracking from pasted job descriptions to final offers. Uses an LLM to extract structured job details, supports JWT-based authentication, and enables users to manage applications through every stage of the hiring process.',
    image: '',
    tags: ['Java', 'Spring Boot', 'JWT', 'MySQL', 'Groq API', 'Docker'],
    details: [
      'Built a Spring Boot REST API with Spring Security and JWT-based authentication for secure multi-user job tracking.',
      'Integrated Groq API to automatically extract structured job details (role, company, tech stack, deadlines) from raw pasted job descriptions.',
      'Modelled the full application lifecycle — Applied, Interviewed, Offered, Rejected — with status transitions and filtering endpoints.',
      'Persisted data with Spring Data JPA and Hibernate backed by MySQL, containerised with Docker, and deployed to Railway.',
    ],
    githubLink: 'https://github.com/harigovindmelath/TrackHire',
  },
  {
    id: 'water-leak',
    title: 'Real-Time Water Leak Detection System',
    badge: 'IEEE Published',
    description:
      'IoT-powered water monitoring system using flow sensors and an LSTM Autoencoder to detect abnormal water usage and potential leaks in real time. Built with Flask, REST APIs, and a live monitoring dashboard. Presented at IEEE IDCIoT 2026.',
    image: '',
    tags: ['Python', 'Flask', 'LSTM', 'TensorFlow', 'IoT', 'REST API'],
    details: [
      'Designed an LSTM Autoencoder trained on normal water-flow patterns to flag anomalous usage that indicates leaks, without requiring labelled fault data.',
      'Built IoT sensor integration for real-time flow data ingestion, preprocessing, and windowed model inference on a Raspberry Pi-class device.',
      'Exposed a Flask REST API with live monitoring endpoints consumed by a dashboard showing usage trends and active alerts.',
      'Research published and presented at IEEE International Conference IDCIoT 2026 (DOI: 10.1109/IDCIoT67589.2026.11455854).',
    ],
    githubLink: 'https://github.com/harigovindmelath/Smart-Water-Leak-Detection-System-IoT-LSTM-Flask-',
  },
  {
    id: 'violence-detection',
    title: 'Real-Time Violence Detection System',
    badge: 'Featured',
    description:
      'CNN-LSTM architecture for detecting violent activity in multi-person video streams. Spatial feature extraction via CNN combined with LSTM temporal modeling for frame-sequence classification.',
    image: '',
    tags: ['PyTorch', 'OpenCV', 'CNN', 'LSTM'],
    details: [
      'Designed a hybrid CNN-LSTM architecture where CNN layers extract per-frame spatial features and LSTM layers model temporal dynamics across sequences.',
      'Trained the model on publicly available violence detection datasets and evaluated on held-out video clips.',
      'Integrated OpenCV for real-time video frame extraction and preprocessing before model inference.',
      'Achieved reliable classification performance distinguishing violent from non-violent activity in multi-person scenes.',
    ],
    githubLink: 'https://github.com/harigovindmelath/Real-Time-Violence-Detection',
  },
  {
    id: 'agriskill',
    title: 'AgriSkill Expert Matching Platform',
    badge: 'Featured',
    description:
      'Web platform connecting farmers with domain experts using intelligent matching. TF-IDF and k-NN recommendation engine surfaces relevant expertise, reducing search friction in agricultural advisory workflows.',
    image: '',
    tags: ['Django', 'Python', 'TF-IDF', 'k-NN'],
    details: [
      'Built a Django-based web platform allowing farmers to describe their problems and receive ranked expert matches based on domain relevance.',
      'Implemented a TF-IDF and k-NN recommendation engine that vectorizes problem descriptions and matches them against expert profiles.',
      'Designed a clean expert profile and search interface with filtering by crop type, region, and specialty.',
      'Reduced average search-to-match time significantly by surfacing the top 3 most relevant experts directly on the search page.',
    ],
    githubLink: 'https://github.com/harigovindmelath/agriskill',
  },
  {
    id: 'motion-alert',
    title: 'Motion Detection & Alert System',
    badge: 'Featured',
    description:
      'Automated surveillance pipeline that detects motion from live video feeds and triggers structured email alerts with image capture, reducing manual monitoring overhead significantly.',
    image: '',
    tags: ['OpenCV', 'Python', 'SMTP'],
    details: [
      'Built a real-time motion detection pipeline using OpenCV background subtraction and contour analysis on live video feeds.',
      'Implemented automatic image capture on motion events and structured email alerts with attached frames via SMTP.',
      'Designed a configurable sensitivity system allowing threshold tuning per environment to minimize false positives.',
      'Reduced manual monitoring overhead by automating detection and notification across multiple camera feeds.',
    ],
    githubLink:
      'https://github.com/harigovindmelath/Motion-Detection-and-Alert-System-with-Image-Capture-and-Email-Notifications',
  },
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className={`${sectionClass} relative`}>
      <div className="container relative z-10 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold md:text-4xl"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="h-full"
            >
              <ProjectCard project={project} onCardClick={() => setSelectedProject(project)} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href={GITHUB_REPOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transform rounded-lg border border-border bg-background px-8 py-3 font-semibold transition-all hover:scale-105 hover:border-primary hover:text-primary"
          >
            Check Out More
          </a>
        </motion.div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
