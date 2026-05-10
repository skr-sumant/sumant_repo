import { useEffect, useRef } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
  delay = 0,
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in-up');
            }, delay * 1000);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay]);

  return (
    <section ref={sectionRef} id={id} className="py-24 px-6 opacity-0">
      <div className="max-w-6xl mx-auto">
        {(eyebrow || title) && (
          <div className="mb-12">
            {eyebrow && (
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                {eyebrow}
              </p>
            )}

            {title && (
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                {title}
              </h2>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}