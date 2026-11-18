import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Process from './components/Process';
import Work from './components/Work';
import CaseStudies from './components/CaseStudies';
import GlowCursor from './components/GlowCursor';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <div className="holo-grid" aria-hidden="true" />
      <GlowCursor />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-black focus:px-3 focus:py-2">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Process />
        <Work />
        <CaseStudies />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
