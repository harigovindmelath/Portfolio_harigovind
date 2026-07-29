import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { DottedSurface } from '@/components/DottedSurface'
import { Linkedin, Mail } from '@/components/icons/Icons'

const EMAIL = 'harigovindmelath52@gmail.com'
const LINKEDIN_URL = 'https://linkedin.com/in/harigovind-melath'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvgygkj'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })
      const json = await res.json()
      if (json.ok) {
        setSent(true)
        setFormData({ name: '', email: '', message: '' })
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSending(false)
    }
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
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
                ✓
              </div>
              <p className="text-lg font-semibold text-primary">Message sent!</p>
              <p className="text-muted-foreground">
                Thanks for reaching out — I'll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 text-sm text-muted-foreground underline hover:text-primary"
              >
                Send another message
              </button>
            </div>
          ) : (
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
                    disabled={sending}
                    className="w-full rounded-md border border-border bg-background/50 px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
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
                    disabled={sending}
                    className="w-full rounded-md border border-border bg-background/50 px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
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
                  disabled={sending}
                  className="w-full resize-none rounded-md border border-border bg-background/50 px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full transform rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {sending ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
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
