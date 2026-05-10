import { useEffect, useRef } from "react";
import { Heart, Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export function Footer() {
  const footerRef = useRef(null);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative bg-black/50 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gradient">Sumant Kumar</h3>
            <p className="text-muted-foreground mb-4">
              Full Stack Developer passionate about creating amazing digital experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/skr-sumant"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/skr-sumant"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://instagram.com/aam__rush"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-secondary-foreground">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <p className="text-muted-foreground mb-2">
              <Mail size={16} className="inline mr-2" />
              sumant.raj.9907@gmail.com
            </p>
            <p className="text-accent">
              Ready to bring your ideas to life! Available to collaborate on exciting projects or discuss potential opportunities. Let's connect and create something amazing together!
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2026 Made with <Heart size={14} className="inline text-red-500 mx-1" /> by Sumant....
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors text-primary"
          >
            <ArrowUp size={16} />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}