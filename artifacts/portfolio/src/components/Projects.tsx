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
  {
    id: 'cyberbullying',
    title: 'Cyberbullying Tweets Classifier',
    badge: '',
    description:
      'NLP classification pipeline using TF-IDF vectorization and Random Forest for cyberbullying detection across tweet datasets. Applied NLP for content moderation use cases.',
    image: '',
    tags: ['Python', 'NLP', 'Scikit-learn', 'TF-IDF'],
    details: [
      'Built a text classification pipeline with TF-IDF vectorization and a Random Forest classifier trained on labeled tweet datasets.',
      'Performed data cleaning, tokenization, stopword removal, and feature extraction as preprocessing steps.',
      'Evaluated model performance with precision, recall, and F1 metrics across cyberbullying categories.',
      'Demonstrated applied NLP for content moderation with strong baseline results on public datasets.',
    ],
    githubLink: 'https://github.com/harigovindmelath/CyberBulllying-Tweets-Classifier',
  },
  {
    id: 'book-management',
    title: 'Book Management System',
    badge: '',
    description:
      'Spring Boot CRUD application for managing books and authors with a clean REST API, demonstrating solid backend fundamentals and Java web development patterns.',
    image: '',
    tags: ['Java', 'Spring Boot', 'REST API', 'CRUD'],
    details: [
      'Built a full CRUD REST API using Spring Boot for managing a library of books and their associated authors.',
      'Implemented standard HTTP method conventions (GET, POST, PUT, DELETE) with proper request and response handling.',
      'Structured the project with layered architecture separating controllers, services, and repositories for maintainability.',
      'Demonstrated core Java backend skills including dependency injection, JPA entity mapping, and RESTful API design.',
    ],
    githubLink: 'https://github.com/harigovindmelath/Book_Management_System_Java',
  },
]

const INITIAL_COUNT = 4

export function Projects() {
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT)

  const handleShowMore = () => {
    if (showAll) {
      setShowAll(false)
    } else {
      // After showing all 6, further clicks go to GitHub
      setShowAll(true)
    }
  }

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
          {visibleProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ProjectCard project={project} onCardClick={() => setSelectedProject(project)} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          {!showAll ? (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="transform rounded-lg border border-border bg-background px-8 py-3 font-semibold transition-all hover:scale-105 hover:border-primary hover:text-primary"
            >
              Show More
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowAll(false)}
                className="transform rounded-lg border border-border bg-background px-8 py-3 font-semibold transition-all hover:scale-105 hover:border-primary hover:text-primary"
              >
                Show Less
              </button>
              <a
                href={GITHUB_REPOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                View all repositories on GitHub →
              </a>
            </>
          )}
        </motion.div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
