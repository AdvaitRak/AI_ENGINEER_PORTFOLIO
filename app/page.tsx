import { CustomCursor } from '@/components/custom-cursor'
import { NodeNetwork } from '@/components/node-network'
import { ScrollProgress } from '@/components/scroll-progress'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Nav } from '@/components/nav'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Experience } from '@/components/sections/experience'
import { Projects } from '@/components/sections/projects'
import { Skills } from '@/components/sections/skills'
import { Achievements } from '@/components/sections/achievements'
import { Contact } from '@/components/sections/contact'

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <NodeNetwork />
      <ScrollProgress />
      <Nav />

      <main id="top" className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </>
  )
}
