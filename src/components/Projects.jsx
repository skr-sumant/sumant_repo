import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Section } from "./Section";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A modern responsive portfolio built with React, Tailwind CSS, and Framer Motion.",
    tech: ["React", "Tailwind", "Framer Motion"],
    github: "https://github.com/",
    live: "https://example.com",
  },
  {
  title: "Golu Video",
  description:
  "A modern videography and photography platform designed to showcase creative visual content with an elegant and responsive user interface. Features high-quality media galleries, smooth video playback, dynamic portfolio sections, and an immersive viewing experience optimized for all devices.",  tech: ["React", "Vercel", "Tailwind"],
  github: "https://github.com/skr-sumant/golu-video",
  live: "https://golu-video.vercel.app",
},

{
  title: "Image Gallery",
  description:
    "A responsive image gallery application with clean UI and optimized image viewing experience.",
  tech: ["React", "Tailwind", "JavaScript"],
  github: "https://github.com/skr-sumant/50days50projects",
  live: "https://imgallery-sumant.vercel.app",
},
  
  {
    title: "Task Manager",
    description:
      "A productivity app to manage daily tasks with CRUD operations and responsive UI.",
    tech: ["React", "Firebase", "Tailwind"],
    github: "https://github.com/",
    live: "https://example.com",
  },
  {
  title: "Weather Forecast",
  description:
    "A real-time weather forecasting app with responsive UI and live weather API integration.",
  tech: ["React", "Tailwind", "Weather API"],
  github: "https://github.com/skr-sumant/weather_forecast",
  live: "https://weather-forecast-sumant.vercel.app",
},

{
  title: "Attendence Calculator",
  description:
    "A smart attendance calculator to track attendance percentage and estimate required classes.",
  tech: ["React", "Vercel", "Tailwind"],
  github: "https://github.com/skr-sumant/Mini-Projects",
  live: "https://attendencecalculator-one.vercel.app",
},

{
  title: "Sumant Proposal",
  description:
    "A modern proposal landing page with elegant UI design and responsive user experience.",
  tech: ["React", "Tailwind", "Framer Motion"],
  github: "https://github.com/skr-sumant/Mini-Projects",
  live: "https://sumant-proposal.vercel.app",
},
  {
    title: "Split Ease - A Bill Splitter",
    description:
      "A web app where you can easily manage your and your group's expenses with notification Reminder. ",
    tech: ["React", "Firebase", "Tailwind"],
    github: "https://github.com/skr-sumant/SplitEase",
    live: "https://spliteasee.vercel.app/",
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="glass rounded-2xl p-6 hover-lift flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-playflair mb-3">
                {project.title}
              </h3>

              <p className="text-muted-foreground  font-share text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <FaGithub size={18} />
                GitHub
              </a>

              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <ExternalLink size={18} />
                Live
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
