import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IconCloud } from '@/components/IconCloud'
import { sectionClass } from '@/lib/utils'

// Icon cloud slugs (simple-icons npm)
const iconCloudSlugs = [
  'python', 'java', 'c', 'html5', 'css3',
  'pytorch', 'tensorflow', 'keras', 'scikitlearn', 'opencv', 'numpy', 'pandas',
  'fastapi', 'django', 'flask', 'springboot', 'jsonwebtokens', 'hibernate',
  'mysql', 'sqlite',
  'docker', 'git', 'github', 'linux', 'railway', 'amazonwebservices',
]

// Visual groups — no headings, just ordered clusters with spacing between them
const skillGroups: Array<Array<{ slug: string; name: string }>> = [
  // Languages
  [
    { slug: 'python',            name: 'Python'    },
    { slug: 'java',              name: 'Java'      },
    { slug: 'c',                 name: 'C'         },
    { slug: 'html5',             name: 'HTML5'     },
    { slug: 'css3',              name: 'CSS3'      },
  ],
  // ML / AI / Data
  [
    { slug: 'pytorch',           name: 'PyTorch'      },
    { slug: 'tensorflow',        name: 'TensorFlow'   },
    { slug: 'keras',             name: 'Keras'        },
    { slug: 'scikitlearn',       name: 'Scikit-learn' },
    { slug: 'opencv',            name: 'OpenCV'       },
    { slug: 'numpy',             name: 'NumPy'        },
    { slug: 'pandas',            name: 'Pandas'       },
  ],
  // Backend & Frameworks
  [
    { slug: 'fastapi',           name: 'FastAPI'       },
    { slug: 'django',            name: 'Django'        },
    { slug: 'flask',             name: 'Flask'         },
    { slug: 'springboot',        name: 'Spring Boot'   },
    { slug: 'springsecurity',    name: 'Spr. Security' },
    { slug: 'hibernate',         name: 'Hibernate'     },
    { slug: 'jsonwebtokens',     name: 'JWT'           },
  ],
  // Databases
  [
    { slug: 'mysql',             name: 'MySQL'   },
    { slug: 'sqlite',            name: 'SQLite'  },
  ],
  // DevOps & Tools
  [
    { slug: 'docker',            name: 'Docker'  },
    { slug: 'git',               name: 'Git'     },
    { slug: 'github',            name: 'GitHub'  },
    { slug: 'linux',             name: 'Linux'   },
    { slug: 'railway',           name: 'Railway' },
    { slug: 'amazonwebservices', name: 'AWS'     },
  ],
]

/** Fetches and inlines a Simple Icons SVG so CSS can colour it. */
function SkillIcon({ slug, name }: { slug: string; name: string }) {
  const [svg, setSvg] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(`https://cdn.simpleicons.org/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error('404')
        return r.text()
      })
      .then((text) => { if (!cancelled) setSvg(text) })
      .catch(() => { if (!cancelled) setFailed(true) })
    return () => { cancelled = true }
  }, [slug])

  if (failed) {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
        {name.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  if (!svg) {
    return <span className="h-8 w-8 animate-pulse rounded bg-muted" />
  }

  function adaptFills(raw: string): string {
    return raw.replace(/fill="#([0-9a-fA-F]{6})"/g, (_match, hex) => {
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      const nearBlack = r <= 40 && g <= 40 && b <= 40
      const nearWhite = r >= 215 && g >= 215 && b >= 215
      return nearBlack || nearWhite ? 'fill="currentColor"' : `fill="#${hex}"`
    })
  }

  const styled = adaptFills(svg).replace('<svg ', '<svg class="h-8 w-8" ')

  return (
    <span
      className="flex h-8 w-8 items-center justify-center text-foreground"
      // biome-ignore lint: intentional SVG inject from trusted Simple Icons CDN
      dangerouslySetInnerHTML={{ __html: styled }}
    />
  )
}

function SkillCard({ slug, name }: { slug: string; name: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card/60 p-3 text-center backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md aspect-square">
      <SkillIcon slug={slug} name={name} />
      <span className="text-xs font-medium leading-tight text-muted-foreground">{name}</span>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className={sectionClass}>
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold md:text-4xl"
        >
          Technical Skills
        </motion.h2>

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start">
          {/* Left — orbiting icon cloud */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex min-h-[380px] w-full items-center justify-center lg:w-1/2"
          >
            <IconCloud iconSlugs={iconCloudSlugs} />
          </motion.div>

          {/* Right — grouped skill cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
              {skillGroups.flat().map((skill) => (
                <SkillCard key={skill.slug} slug={skill.slug} name={skill.name} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
