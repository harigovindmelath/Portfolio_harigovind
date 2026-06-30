import { useTheme } from '@/hooks/useTheme'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Projects } from '@/components/Projects'
import { Education } from '@/components/Education'
import { Skills } from '@/components/Skills'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`${theme} bg-background text-foreground transition-colors duration-500`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
