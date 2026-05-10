import { useEffect, useRef, useState } from "react";
import { GraduationCap, Code2, Trophy } from "lucide-react";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" eyebrow="About Me" title="A quick intro">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass rounded-2xl p-8 hover-lift">
          <p className="text-lg leading-relaxed text-muted-foreground font-playflair">
            I'm a{" "}
            <span className="text-accent font-cursive">
              Computer Science
            </span>{" "}
            undergrad at Parul University with a strong interest in full-stack
            web development. I love turning ideas into real products — from
            designing clean interfaces in React to building robust REST APIs
            with Node.js and MongoDB. I'm constantly learning, currently
            exploring AI integrations and AWS cloud.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <Stat n="10+" l="Projects" />
            <Stat n="50+" l="LeetCode" />
            <Stat n="4" l="Certifications" />
          </div>
        </div>

        <div className="space-y-4 font-playflair">
          <Card
            icon={<GraduationCap />}
            title="Education"
            body="B.Tech CSE, Parul University (2023–2027) · CGPA 7.65"
          />

          <Card
            icon={<Code2 />}
            title="Focus"
            body="MERN stack · REST APIs · Responsive UI"
          />

          <Card
            icon={<Trophy />}
            title="Currently"
            body="Solving DSA · Learning AWS DevOps"
          />
        </div>
      </div>
    </Section>
  );
}

function Stat({ n, l }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const target = Number.parseInt(n, 10);
  const suffix = n.replace(String(target), "");

  useEffect(() => {
    const element = ref.current;

    if (!element || Number.isNaN(target)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const duration = 1200;
        const start = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          setValue(Math.round(target * eased));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="rounded-xl bg-secondary/50 p-4">
      <div className="text-2xl font-bold text-gradient">
        {Number.isNaN(target) ? n : `${value}${suffix}`}
      </div>

      <div className="text-xs text-muted-foreground mt-1">{l}</div>
    </div>
  );
}

function Card({ icon, title, body }) {
  return (
    <div className="glass rounded-2xl p-5 hover-lift">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-lg bg-gradient-primary text-primary-foreground grid place-items-center">
          {icon}
        </div>

        <h3 className="font-semibold">{title}</h3>
      </div>

      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
