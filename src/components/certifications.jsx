import { Award, ExternalLink } from "lucide-react";
import { Section } from "./Section";

const certifications = [
 {
  title: "Computer Networks And Internet Protocol",
  issuer: "NPTEL",
  year: "2025",
  link: "https://drive.google.com/file/d/1GadryUfFhU9WP2qL8gS_30sSs9OXKsQr/view?usp=sharing",
},

{
  title: "Academy Cloud Foundations",
  issuer: "AWS",
  year: "2026",
  link: "https://drive.google.com/file/d/1XLZP3Cj2OqapzFdS-dCOQZeZ_HBKJf4v/view?usp=sharing",
},

{
  title: "Getting Started with DevOps on AWS",
  issuer: "AWS",
  year: "2025",
  link: "https://drive.google.com/file/d/1ge5DDS8eD0iICq9MO-ONBB6s46Gs_FTA/view?usp=sharing",
},

{
  title: "Web Development using React.js",
  issuer: "Parul university",
  year: "2025",
  link: "https://drive.google.com/file/d/1GrgfcUnJ4fE3mwoLlYH0iYhayISLHRrR/view?usp=sharing",
},
];

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Courses & achievements"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="glass rounded-2xl p-6 hover-lift flex items-start justify-between gap-4"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center shrink-0">
                <Award size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {cert.title}
                </h3>

                <p className="text-sm text-muted-foreground mt-1">
                  {cert.issuer}
                </p>

                <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                  {cert.year}
                </span>
              </div>
            </div>

            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}