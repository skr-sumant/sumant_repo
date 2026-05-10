import {
  Code2,
  Database,
  Globe,
  Server,
  Cpu,
  Wrench,
} from "lucide-react";

import { Section } from "./Section";

const skillCategories = [
  {
    title: "Frontend",
    icon: <Globe size={22} />,
    skills: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend",
    icon: <Server size={22} />,
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    icon: <Database size={22} />,
    skills: ["MongoDB", "MySQL", "Firebase"],
  },
  {
    title: "Programming Languages",
    icon: <Code2 size={22} />,
    skills: ["Java", "Python"],
  },
  {
    title: "Tools",
    icon: <Wrench size={22} />,
    skills: ["Git", "GitHub", "VS Code", "Postman"],
  },
  {
    title: "Other",
    icon: <Cpu size={22} />,
    skills: ["DSA", "Problem Solving", "Responsive Design"],
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technologies I use"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="glass rounded-2xl p-6 hover-lift"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center">
                {category.icon}
              </div>

              <h3 className="text-xl font-semibold font-playflair">
                {category.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-share"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}