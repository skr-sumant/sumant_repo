import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto max-w-6xl px-6 flex items-center justify-between rounded-2xl transition-all ${
          scrolled ? "glass shadow-card py-3" : "py-4"
        }`}
      >
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src="/favicon.png"
            alt="Sumant portfolio logo"
            className="h-10 w-10 rounded-2xl object-cover shadow-glow"
          />

          <span className="leading-tight">
            <span className="block font-bold uppercase tracking-tight text-gradient">
              Sumant
            </span>

            <span className=" typewriter mt-1 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground x">
              FullStack Dev...

              
            </span>
          </span>
        </a>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-10 text-md text-muted-foreground">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Button */}
        <a
          href="https://www.linkedin.com/in/skr-sumant/"
          className="hidden md:inline-flex items-center rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-60 transition"
        >
          ✨ Connect Me
        </a>

        <button
          type="button"
          className="md:hidden grid h-10 w-10 place-items-center rounded-xl border border-border bg-secondary/70 text-foreground"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="mx-auto mt-2 max-w-6xl px-6 md:hidden">
          <div className="glass rounded-2xl p-3 shadow-card">
            <ul className="flex flex-col text-sm text-muted-foreground">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-xl px-4 py-3 hover:bg-secondary hover:text-foreground transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="mailto:sumant.raj.9907@gmail.com"
              className="mt-2 flex items-center justify-center rounded-xl bg-gradient-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow"
              onClick={() => setMenuOpen(false)}
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
