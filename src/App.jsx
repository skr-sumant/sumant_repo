import { useEffect } from "react";
import { About } from "./components/About";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { Certifications } from "./components/certifications";
import { Contact } from "./components/contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import Navbar from "./components/Navbar";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Analytics } from "@vercel/analytics/next"

function App() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden text-foreground">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About delay={0.2} />
          <Projects delay={0.4} />
          <Skills delay={0.6} />
          <Certifications delay={0.8} />
          <Stats delay={1.0} />
          <Contact delay={1.2} />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
