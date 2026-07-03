import { useState } from "react";
import { site } from "@/data/content";
import { useInView } from "@/hooks/useInView";
import { sendContactEmail, isEmailjsConfigured } from "@/utils/email";
import { sanitizeText, isValidEmail, LIMITS } from "@/utils/sanitize";
import heroBg from "@/assets/hero-bg.jpg";

/* ── icons ── */
const MailIcon = (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);
const YouTubeIcon = (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const InstagramIcon = (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const XIcon = (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

type Status = "idle" | "sending" | "success" | "error";

const contactItems = [
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}`, icon: MailIcon },
  { label: "YouTube", value: "@adi.vishwa", href: site.social.youtube, icon: YouTubeIcon },
  { label: "Instagram", value: "@adi.visualsss", href: site.social.instagram, icon: InstagramIcon },
  { label: "X (Twitter)", value: "@Adi_Visualsss", href: site.social.x, icon: XIcon },
].filter((c) => c.href);

const EMPTY = { firstName: "", lastName: "", email: "", subject: "", message: "", company: "" };

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formSection = useInView<HTMLDivElement>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.lastName.trim()) next.lastName = "Required";
    if (!isValidEmail(form.email)) next.email = "Enter a valid email";
    if (!form.message.trim()) next.message = "Tell me about your project";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    // Honeypot: a hidden field real users never fill. Bots usually do.
    if (form.company.trim()) {
      setStatus("success"); // silently drop bots
      return;
    }

    if (!validate()) return;

    const payload = {
      firstName: sanitizeText(form.firstName, LIMITS.name),
      lastName: sanitizeText(form.lastName, LIMITS.name),
      email: sanitizeText(form.email, LIMITS.email),
      subject: sanitizeText(form.subject, LIMITS.subject),
      message: sanitizeText(form.message, LIMITS.message),
    };

    setStatus("sending");
    setErrorMsg("");

    try {
      if (isEmailjsConfigured) {
        await sendContactEmail(payload);
      } else {
        // Graceful fallback: open the visitor's email client pre-filled.
        const body = `${payload.message}\n\n— ${payload.firstName} ${payload.lastName} (${payload.email})`;
        const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(
          payload.subject || "Project inquiry"
        )}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
      }
      setStatus("success");
      setForm(EMPTY);
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email me directly.");
    }
  };

  const inputBase =
    "w-full bg-zinc-950 border text-[#f5f0e8] text-sm px-4 py-3 focus:outline-none transition-all duration-300 placeholder-gray-700";

  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex items-end justify-start pt-16 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        <div className="relative z-10 px-8 md:px-16 pb-16 max-w-6xl">
          <div className="flex items-center gap-3 mb-5 animate-fade-in-up">
            <div className="w-8 h-px bg-amber-400/60" />
            <p
              className="text-amber-400 text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Let's Talk
            </p>
          </div>
          <h1
            className="animate-fade-in-up delay-100 text-[clamp(4rem,14vw,10rem)] leading-[0.88] tracking-tight text-[#f5f0e8]"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            Get In
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(245,240,232,0.5)" }}>
              &nbsp;Touch
            </span>
          </h1>
          <p className="animate-fade-in-up delay-200 text-gray-400 text-sm mt-6 max-w-sm leading-relaxed">
            Ready to elevate your content? Let's make something great together.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-black" ref={formSection.ref}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-16 items-start">
            {/* Left info */}
            <div
              className={`md:col-span-2 transition-all duration-800 ${
                formSection.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-amber-400/60" />
                <p
                  className="text-amber-400 text-xs tracking-[0.4em] uppercase"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Connect
                </p>
              </div>

              <p className="text-gray-500 text-sm leading-[1.9] mb-10 font-light">
                I'm always open to new projects and collaborations. Whether you need
                a full video edit, color grading, or motion graphics — I'm here for it.
              </p>

              <div className="space-y-5">
                {contactItems.map(({ label, value, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-9 h-9 border border-amber-400/20 flex items-center justify-center flex-shrink-0 text-amber-400/60 group-hover:border-amber-400/50 group-hover:text-amber-400 transition-all duration-300">
                      {icon}
                    </div>
                    <div>
                      <span className="block text-gray-700 text-[10px] tracking-[0.3em] uppercase">
                        {label}
                      </span>
                      <span className="text-gray-400 text-xs group-hover:text-amber-400 transition-colors duration-300 tracking-wide break-all">
                        {value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability badge */}
              <div className="mt-10 flex items-center gap-3 p-4 border border-white/6 bg-zinc-950/60">
                <div className={`w-2 h-2 rounded-full ${site.contact.availability ? "bg-green-400 animate-pulse" : "bg-gray-600"}`} />
                <span className="text-gray-400 text-xs tracking-wide">
                  {site.contact.availability ? "Available for new projects" : "Currently booked"}
                </span>
              </div>
            </div>

            {/* Right form */}
            <div
              className={`md:col-span-3 transition-all duration-800 delay-200 ${
                formSection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-amber-400/60" />
                <p
                  className="text-amber-400 text-xs tracking-[0.4em] uppercase"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Leave a Message
                </p>
              </div>

              {status === "success" ? (
                <div className="border border-amber-400/20 p-12 text-center bg-zinc-950/60">
                  <div className="w-14 h-14 rounded-full bg-amber-400/8 border border-amber-400/30 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3
                    className="text-[#f5f0e8] text-3xl mb-3"
                    style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.1em" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-gray-400 text-xs tracking-widest uppercase hover:text-amber-400 transition-colors duration-300 border border-white/10 px-5 py-2.5 hover:border-amber-400/40"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Honeypot field (hidden from humans) */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.company}
                      onChange={handleChange}
                    />
                  </div>

                  {!isEmailjsConfigured && (
                    <div className="border border-amber-400/20 bg-amber-400/[0.04] px-4 py-3 text-amber-300/80 text-[11px] tracking-wide">
                      Email delivery isn't configured yet — submitting will open your email app instead. Set up EmailJS to send directly from the site.
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "firstName", label: "First Name", placeholder: "John" },
                      { name: "lastName", label: "Last Name", placeholder: "Doe" },
                    ].map(({ name, label, placeholder }) => (
                      <div key={name}>
                        <label htmlFor={name} className="block text-gray-600 text-[10px] tracking-[0.3em] uppercase mb-2">
                          {label} <span className="text-amber-400">*</span>
                        </label>
                        <input
                          id={name}
                          type="text"
                          name={name}
                          value={form[name as keyof typeof form]}
                          onChange={handleChange}
                          maxLength={LIMITS.name}
                          className={`${inputBase} ${errors[name] ? "border-red-500/50" : "border-white/8 focus:border-amber-400/40"}`}
                          placeholder={placeholder}
                          autoComplete="given-name"
                        />
                        {errors[name] && <p className="text-red-400/70 text-[10px] mt-1">{errors[name]}</p>}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "email", label: "Email", placeholder: "you@example.com", type: "email" },
                      { name: "subject", label: "Subject", placeholder: "Project inquiry", type: "text" },
                    ].map(({ name, label, placeholder, type }) => (
                      <div key={name}>
                        <label htmlFor={name} className="block text-gray-600 text-[10px] tracking-[0.3em] uppercase mb-2">
                          {label} {name === "email" && <span className="text-amber-400">*</span>}
                        </label>
                        <input
                          id={name}
                          type={type}
                          name={name}
                          value={form[name as keyof typeof form]}
                          onChange={handleChange}
                          maxLength={name === "email" ? LIMITS.email : LIMITS.subject}
                          className={`${inputBase} ${errors[name] ? "border-red-500/50" : "border-white/8 focus:border-amber-400/40"}`}
                          placeholder={placeholder}
                          autoComplete={name === "email" ? "email" : "off"}
                        />
                        {errors[name] && <p className="text-red-400/70 text-[10px] mt-1">{errors[name]}</p>}
                      </div>
                    ))}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-600 text-[10px] tracking-[0.3em] uppercase mb-2">
                      Message <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      maxLength={LIMITS.message}
                      className={`${inputBase} resize-none ${errors.message ? "border-red-500/50" : "border-white/8 focus:border-amber-400/40"}`}
                      placeholder="Tell me about your project..."
                    />
                    <div className="flex items-center justify-between mt-1">
                      {errors.message ? (
                        <p className="text-red-400/70 text-[10px]">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <span className="text-gray-700 text-[10px] ml-auto">
                        {form.message.length}/{LIMITS.message}
                      </span>
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="text-red-400/80 text-xs">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-4 bg-amber-400 text-black text-xs tracking-widest uppercase font-semibold hover:bg-amber-300 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
