import { useEffect, useRef } from "react";
import { Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import heroImage from "../assets/hero.png";

export function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative isolate min-h-screen overflow-hidden px-6 pt-28 text-foreground opacity-0"
    >
      <video
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-95"
        src="/hero_video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_42%,_oklch(0.82_0.16_205/0.18),_transparent_24rem),linear-gradient(180deg,_oklch(0.04_0.02_285/0.86),_oklch(0.1_0.06_300/0.58)_45%,_oklch(0.04_0.02_285/0.94))]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-black/45 px-5 py-3 text-base font-semibold text-primary shadow-card backdrop-blur">
            <span className="text-sm"> 👋Hi</span>
            Welcome to My Portfolio
          </div>

          <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-2xl lg:text-3xl xl:text-4xl">
            <span className="block">Hi, I'm</span>
            <span className="typewriter mt-3 block w-fit max-w-full text-gradient">
              Sumant Kumar
            </span>
          </h1>

          <p className="mt-6 text-2xl font-semibold text-primary sm:text-3xl">
            Full Stack Developer
          </p>

          <p className="mt-8 max-w-3xl text-lg leading-9 text-muted-foreground sm:text-md font-supermercado">
  I'm a passionate Computer Science student specializing in the MERN
  stack. I love building scalable, user-friendly web applications that
  solve real-world problems and make a positive impact.
</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:sumant.raj.9907@gmail.com"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-primary px-7 py-4 text-lg font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition"
            >
              <Mail size={21} />
              Hire Me
            </a>

            <a
              href="/SUMANT_KUMAR.pdf"
              download
              className="inline-flex items-center gap-3 rounded-full border border-primary/70 px-7 py-4 text-lg font-semibold text-accent hover:bg-secondary transition "
            >
              <Download size={21} />
              Download RESUME
            </a>
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href="https://github.com/skr-sumant"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-12 w-12 place-items-center rounded-full border border-border bg-black/35 hover:bg-secondary transition"
              aria-label="GitHub profile"
            >
              <FaGithub size={30} />
            </a>

            <a
              href="https://www.linkedin.com/in/skr-sumant/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-12 w-12 place-items-center rounded-full border border-border bg-black/35 hover:bg-secondary transition"
              aria-label="LinkedIn profile"
            >
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>

        <div className="relative mx-auto mt-8 aspect-square w-full max-w-[16rem] animate-hero-float sm:max-w-[20rem] lg:mt-0 lg:max-w-[24rem] xl:max-w-[28rem]">
          <FloatingBadge className="-left-2 top-5 sm:left-0 sm:top-16 lg:-left-8 lg:top-24">
            🤖AI | ML
          </FloatingBadge>

          <FloatingBadge className="-right-2 top-10 sm:right-0 sm:top-12 lg:-right-8 lg:top-20">
            🥇LeetCode <span className="font-supermercado text-primary">50+</span>
          </FloatingBadge>

          <FloatingBadge className="-left-3 top-1/2 -translate-y-1/2 sm:-left-6 lg:-left-10">
             🎓CGPA <span className="font-supermercado text-accent">7.65</span>
          </FloatingBadge>

          <FloatingBadge className="bottom-3 right-0 sm:bottom-6 lg:-right-6 lg:bottom-10">
           <span className="text-accent "> 10+ Projects</span>
          </FloatingBadge>

          <div
            className="absolute inset-4 rounded-full bg-gradient-primary opacity-70 blur-2xl sm:inset-6 lg:inset-8"
            aria-hidden
          />

          <div className="relative h-full w-full overflow-hidden rounded-full border border-primary/40 bg-secondary/10 p-1.5 shadow-[0_0_22px_oklch(0.67_0.27_300/0.42),0_0_14px_oklch(0.82_0.16_205/0.24)] ring-1 ring-accent/25 ring-offset-2 ring-offset-background sm:p-2 lg:p-2.5">
            <img
              src={heroImage}
              alt="Sumant Kumar"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingBadge({ children, className = "" }) {
  return (
    <div
      className={`absolute z-20 whitespace-nowrap rounded-full border border-border bg-black/70 px-3 py-1.5 text-xs font-semibold text-foreground shadow-card backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm lg:text-base ${className}`}
    >
      {children}
    </div>
  );
}
