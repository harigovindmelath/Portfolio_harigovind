import { scrollToSection } from '@/lib/utils'
import {
  User,
  Code2,
  GraduationCap,
  Wrench,
  Mail,
  Download,
  Sun,
  Moon,
  Github,
  Linkedin,
} from '@/components/icons/Icons'

const GITHUB_URL = 'https://github.com/harigovindmelath'
const LINKEDIN_URL = 'https://linkedin.com/in/harigovind-melath'

const navLinks = [
  { icon: User,         label: 'About',     href: 'about'     },
  { icon: Code2,        label: 'Projects',  href: 'projects'  },
  { icon: GraduationCap,label: 'Education', href: 'education' },
  { icon: Wrench,       label: 'Skills',    href: 'skills'    },
  { icon: Mail,         label: 'Contact',   href: 'contact'   },
]

const socialLinks = [
  { href: GITHUB_URL,   label: 'GitHub',   icon: Github   },
  { href: LINKEDIN_URL, label: 'LinkedIn', icon: Linkedin },
]

interface HeaderProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

function NavTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group relative">
      {children}
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-primary px-2 py-1 text-xs text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </div>
  )
}

export function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center p-4 top-6">
      <nav className="no-scrollbar flex items-center gap-1 overflow-x-auto rounded-full border border-border bg-card/70 px-4 py-2 shadow-lg backdrop-blur-lg">
        {navLinks.map((link) => (
          <NavTooltip key={link.href} label={link.label}>
            <a
              href={`#${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              aria-label={link.label}
              className="flex h-12 w-12 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
            >
              <link.icon className="h-6 w-6" />
            </a>
          </NavTooltip>
        ))}

        <div className="mx-1 h-6 w-px bg-border" aria-hidden="true" />

        {socialLinks.map((link) => (
          <NavTooltip key={link.label} label={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-12 w-12 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
            >
              <link.icon className="h-6 w-6" />
            </a>
          </NavTooltip>
        ))}

        <div className="mx-1 h-6 w-px bg-border" aria-hidden="true" />

        <NavTooltip label="Download Resume">
          <a
            href="/resume.pdf"
            download
            aria-label="Download Resume"
            className="flex h-12 w-12 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            <Download className="h-6 w-6" />
          </a>
        </NavTooltip>

        <NavTooltip label="Toggle Theme">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-12 w-12 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
          </button>
        </NavTooltip>
      </nav>
    </header>
  )
}
