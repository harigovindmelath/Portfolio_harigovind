import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IconCloud } from '@/components/IconCloud'
import { sectionClass, cn } from '@/lib/utils'

// Icon cloud — react-icon-cloud / simple-icons npm slugs
const iconCloudSlugs = [
  'python', 'java', 'html5', 'css3', 'c',
  'openai', 'huggingface', 'pytorch', 'tensorflow', 'scikitlearn',
  'opencv', 'numpy', 'pandas', 'anaconda', 'fastapi',
  'flask', 'django', 'git', 'github',
  'linux', 'jupyter', 'googlecolab', 'mysql',
  'sqlite', 'amazonwebservices',
]

// Right-panel grid
const skillGrid: Array<{ slug: string; name: string }> = [
  { slug: 'python',            name: 'Python'       },
  { slug: 'java',              name: 'Java'         },
  { slug: 'html5',             name: 'HTML5'        },
  { slug: 'css3',              name: 'CSS3'         },
  { slug: 'c',                 name: 'C'            },
  { slug: 'pytorch',           name: 'PyTorch'      },
  { slug: 'tensorflow',        name: 'TensorFlow'   },
  { slug: 'scikitlearn',       name: 'Scikit-learn' },
  { slug: 'opencv',            name: 'OpenCV'       },
  { slug: 'numpy',             name: 'NumPy'        },
  { slug: 'pandas',            name: 'Pandas'       },
  { slug: 'fastapi',           name: 'FastAPI'      },
  { slug: 'django',            name: 'Django'       },
  { slug: 'flask',             name: 'Flask'        },
  { slug: 'mysql',             name: 'MySQL'        },
  { slug: 'sqlite',            name: 'SQLite'       },
  { slug: 'git',               name: 'Git'          },
  { slug: 'github',            name: 'GitHub'       },
  { slug: 'linux',             name: 'Linux'        },
  { slug: 'amazonwebservices', name: 'AWS'          },
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
    // Two-letter pill — always visible, never broken
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
        {name.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  if (!svg) {
    return <span className="h-8 w-8 animate-pulse rounded bg-muted" />
  }

  /**
   * Replace any fill that is "near-black" (R,G,B all ≤ 40) or "near-white"
   * (R,G,B all ≥ 215) with `currentColor` so the icon adapts to the theme.
   * Coloured brand fills (Python yellow, PyTorch red …) are left untouched.
   */
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

          {/* Right — named skill cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
              {skillGrid.map((skill) => (
                <div
                  key={skill.slug}
                  className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card/60 p-3 text-center backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md"
                >
                  <SkillIcon slug={skill.slug} name={skill.name} />
                  <span className="text-xs font-medium leading-tight text-muted-foreground">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
