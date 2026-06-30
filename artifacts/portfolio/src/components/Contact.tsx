import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { DottedSurface } from '@/components/DottedSurface'
import { Linkedin, Mail } from '@/components/icons/Icons'

const EMAIL = 'harigovindmelath52@gmail.com'
const LINKEDIN_URL = 'https://linkedin.com/in/harigovind-melath'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    )
    const mailto = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    // Create a real anchor and click it — works inside iframes where
    // window.open / window.location are blocked for mailto: schemes.
    const a = document.createElement('a')
    a.href = mailto
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-transparent px-4 py-20 sm:px-6 lg:px-8"
    >
      <DottedSurface />

      <div className="relative z-10 container mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-3xl font-bold md:text-4xl"
        >
          Get In Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 text-lg text-muted-foreground"
        >
          I am currently open to AI and ML opportunities, research collaborations, and backend
          development roles. Feel free to reach out and I will get back to you as soon as possible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-lg border border-border bg-card/80 p-8 shadow-lg backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-left font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-border bg-background/50 px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-left font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-border bg-background/50 px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-left font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full resize-none rounded-md border border-border bg-background/50 px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              className="w-full transform rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90 sm:w-auto"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 text-sm text-muted-foreground"
        >
          Or reach me directly:{' '}
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <Mail className="h-4 w-4" />
            {EMAIL}
          </a>
          {' '}and{' '}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </motion.p>
      </div>
    </section>
  )
}
