import './App.css'
import Hero from './components/Hero'
import Section1 from './components/Section1'
import DragonChronicle from './components/DragonChronicle'
import PersonalityQuiz from './components/PersonalityQuiz'

function App() {
  return (
    <main className="site-shell">
      <Hero />
      <Section1 />
      <DragonChronicle />
      <PersonalityQuiz />
    </main>
  )
}

export default App
