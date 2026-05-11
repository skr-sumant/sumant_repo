import {
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { Section } from "./Section";

const WHATSAPP_NUMBER = import.meta.env.VITE_MOB_NO || "";

const personalDetails = [
  {
    icon: <User size={26} />,
    label: "Name",
    value: "Sumant Kumar",
  },
  {
    icon: <Mail size={26} />,
    label: "Email",
    value: "sumant.raj.9907@gmail.com",
    href: "mailto:sumant.raj.9907@gmail.com",
    accent: true,
  },
  {
    icon: <FaInstagram size={26} />,
    label: "Instagram",
    value: "@Sumant_Kumar",
    href: "https://www.instagram.com/aam__rush/",
    accent: true,
  },
  {
    icon: <MapPin size={26} />,
    label: "Location",
    value: "Gujarat, India",
  },
  {
    icon: <Briefcase size={26} />,
    label: "Status",
    value: "Available",
  },
  {
    icon: <GraduationCap size={26} />,
    label: "Education",
    value: "B.Tech CSE",
  },
];

export function Contact() {
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const mobileValue = mobile.trim();
    const message = formData.get("message")?.toString().trim();

    if (!/^[0-9]{10}$/.test(mobileValue)) {
      setMobileError("Please enter a valid 10-digit mobile number using digits only.");
      return;
    }

    setMobileError("");

    const whatsappMessage = [
      "Hello Sumant,",
      "",
      `Name: ${name || "Not provided"}`,
      `Email: ${email || "Not provided"}`,
      `mobile: ${mobile || "Not provided"}`,
      "",
      "Message:",
      message || "Not provided",
    ].join("\n");


    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.location.href = whatsappUrl;
  };

  return (
    <Section id="contact">
      <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h2 className="mb-10 text-4xl font-black tracking-tight text-foreground md:text-xl">
            Personal Details
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {personalDetails.map((detail) => (
              <DetailCard key={detail.label} {...detail} />
            ))}
          </div>

          <div className="mt-10 space-y-6">

  <div className="rounded-3xl bg-black/45 p-6 shadow-card backdrop-blur-4xl">
    <h3 className="mb-4 text-2xl font-semibold text-foreground">
      Ready to collaborate?
    </h3>

    <p className="text-muted-foreground">
      Open to exciting projects, collaborations, and opportunities.
      Let’s build something amazing together.
    </p>
  </div>

  <div className="rounded-3xl bg-black/45 p-6 shadow-card backdrop-blur-4xl">
    <h3 className="mb-4 text-2xl font-semibold text-foreground">
      Quick contact links
    </h3>

    <div className="grid gap-3">
      <a
        href="mailto:sumant.raj.9907@gmail.com"
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground transition hover:border-accent/40"
      >
        Email Me
      </a>

      <a
        href="https://www.instagram.com/aam__rush/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground transition hover:border-accent/40"
      >
        Instagram
      </a>

      <a
        href="https://wa.me/918235134811?text=Hello%20Sumant%2C%20I%20would%20like%20to%20connect%20with%20you."
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground transition hover:border-accent/40"
      >
        Call / WhatsApp
      </a>
    </div>
  </div>

</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid w-full gap-7 rounded-3xl p-6 shadow-card backdrop-blur-4xl md:p-10"
        >
          <h3 className="text-3xl font-playflair text-center tracking-tight text-foreground md:text-4xl">
            Send Me a Message
          </h3>

          <div>
            <label className="mb-3 block text-base font-semibold text-muted-foreground">
              Your Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="John Doe"
              className="w-full rounded-xl bg-black/45 px-5 py-4 text-lg text-foreground outline-none backdrop-blur-xl transition placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-accent/30"
            />
          </div>

          <div>
            <label className="mb-3 block text-base font-semibold text-muted-foreground">
              Your Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="w-full rounded-xl bg-black/45 px-5 py-4 text-lg text-foreground outline-none backdrop-blur-xl transition placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-accent/30"
            />
          </div>
          <div>
            <label className="mb-3 block text-base font-semibold text-muted-foreground">
              Your Mobile Number
            </label>
            <input
              name="mobile"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              required
              value={mobile}
              placeholder="9123456789"
              className="w-full rounded-xl bg-black/45 px-5 py-4 text-lg text-foreground outline-none backdrop-blur-xl transition placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-accent/30"
              onChange={(event) => {
                const digits = event.currentTarget.value.replace(/\D/g, "").slice(0, 10);
                setMobile(digits);
                if (mobileError && /^[0-9]{10}$/.test(digits)) {
                  setMobileError("");
                }
              }}
            />
            {mobileError ? (
              <p className="mt-2 text-sm text-destructive">{mobileError}</p>
            ) : null}
          </div>
          

          <div>
            <label className="mb-3 block text-base font-semibold text-muted-foreground">
              Your Message
            </label>
            <textarea
              name="message"
              rows="6"
              required
              placeholder="Tell me about your project..."
              className="w-full resize-none rounded-xl bg-black/45 px-5 py-4 text-lg text-foreground outline-none backdrop-blur-xl transition placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-accent/30"
            />
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:opacity-95"
            >
              <Send size={22} />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}

function DetailCard({ icon, label, value, href, accent }) {
  const content = (
    <>
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-muted-foreground font-playflair mb-1 sm:text-base">{label}</p>
        <p
          className={`break-words text-lg font-share leading-snug sm:text-sm ${
            accent ? "text-accent" : "text-foreground"
          }`}
        >
          {value}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="flex min-h-28 items-center gap-5 rounded-3xl bg-black/45 p-5 shadow-card backdrop-blur-2xl transition hover:-translate-y-1 sm:p-6"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex min-h-28 items-center gap-5 rounded-3xl bg-black/45 p-5 shadow-card backdrop-blur-2xl transition hover:-translate-y-1 sm:p-6">
      {content}
    </div>
  );
}
