import { useEffect, useRef } from "react";
import type { Page } from "@/App";
import { site } from "@/data/content";
import { useInView } from "@/hooks/useInView";
import heroBg from "@/assets/hero-bg.jpg";

interface HomePageProps {
  navigate: (page: Page) => void;
}

const categories = [
  "Business & Finance",
  "Documentary",
  "Economy",
  "Entertainment",
  "Gaming",
  "People & Blogs",
  "Science & Technology",
  "Sports",
];

const skills = [
  "Adobe After Effects",
  "Adobe Premiere Pro",
  "Alight Motion",
  "CapCut",
  "DaVinci Resolve",
];

const styles = [
  "Commentary",
  "Documentary",
  "Educational",
  "Faceless",
  "Gameplay",
  "Talking Head",
];

const statItems = (s: typeof site.stats) => [
  { value: s.videos, label: "Videos", desc: "Published" },
  { value: s.views, label: "Views", desc: "Total reach" },
  { value: s.likes, label: "Likes", desc: "& counting" },
];

export default function HomePage({ navigate }: HomePageProps) {
  const statsSection = useInView<HTMLDivElement>();
  const categoriesSection = useInView<HTMLDivElement>();
  const skillsSection = useInView<HTMLDivElement>();
  const ctaSection = useInView<HTMLDivElement>();
  
  // Showreel specific inView hook (0.3 threshold to trigger when 30% visible)
  const showreelSection = useInView<HTMLDivElement>(0.3);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    
    if (showreelSection.inView) {
      v.play().catch((err) => console.warn("Autoplay prevented:", err));
    } else {
      v.pause();
    }
  }, [showreelSection.inView]);

  const stats = statItems(site.stats);

  return (
    <div className="bg-black">
      {/* ─── Hero ─── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        <div className="relative z-10 text-center px-6 flex flex-col items-center">
          <div className="animate-fade-in-up delay-100 flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-amber-400/60" />
            <p
              className="text-amber-400 text-xs tracking-[0.5em] uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Video Portfolio
            </p>
            <div className="w-8 h-px bg-amber-400/60" />
          </div>

          <h1
            className="animate-fade-in-up delay-200 text-[clamp(4.5rem,17vw,13rem)] leading-[0.88] tracking-tight text-[#f5f0e8] mb-6 select-none"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            ADITYA
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(245,240,232,0.4)" }}>
              VISHWAKARMA
            </span>
          </h1>

          <p className="animate-fade-in-up delay-300 text-[clamp(0.65rem,1.8vw,0.8rem)] tracking-[0.6em] uppercase text-gray-400 font-light mb-12">
            {site.heroTagline}
          </p>

          <div className="animate-fade-in-up delay-400 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("work")}
              className="group relative px-8 py-3.5 bg-amber-400 text-black text-xs tracking-widest uppercase font-semibold overflow-hidden transition-all duration-300 hover:bg-amber-300"
            >
              <span className="relative z-10">View My Work</span>
            </button>
            <button
              onClick={() => navigate("contact")}
              className="px-8 py-3.5 border border-white/20 text-white text-xs tracking-widest uppercase hover:border-white/50 hover:bg-white/5 transition-all duration-300 font-medium"
            >
              Let's Talk
            </button>
          </div>
        </div>

        {/* Floating stats */}
        <div className="absolute bottom-10 right-6 md:right-12 z-10 hidden md:flex flex-col gap-4 text-right animate-fade-in delay-700">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col">
              <span
                className="text-2xl text-[#f5f0e8] leading-none"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                {value}
              </span>
              <span className="text-gray-600 text-[10px] tracking-[0.3em] uppercase">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Marquee strip ─── */}
      <div className="border-y border-white/5 py-4 overflow-hidden bg-zinc-950 relative z-10">
        <div className="marquee-inner whitespace-nowrap">
          {[...Array(2)].map((_, di) => (
            <span key={di} className="inline-flex">
              {["Video Editing", "Motion Graphics", "Color Grading", "Storytelling", "Content Creation", "Post Production"].map((item, i) => (
                <span key={i} className="inline-flex items-center">
                  <span className="text-gray-600 text-xs tracking-[0.4em] uppercase px-8">{item}</span>
                  <span className="text-amber-400/30 text-xs">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ─── Stats ─── */}
      <section className="py-20 bg-black relative z-10" ref={statsSection.ref}>
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {stats.map(({ value, label, desc }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-1 transition-all duration-700 ${
                statsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span
                className="text-[clamp(2.5rem,7vw,4.5rem)] text-[#f5f0e8] leading-none"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                {value}
              </span>
              <span className="text-gray-400 text-xs tracking-[0.3em] uppercase">{label}</span>
              <span className="text-gray-700 text-[10px] tracking-wide">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Showreel ─── */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden" ref={showreelSection.ref}>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, #fbbf24 0%, transparent 70%)",
          }}
        />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber-400/50" />
              <p
                className="text-amber-400 text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Featured Work
              </p>
              <div className="w-8 h-px bg-amber-400/50" />
            </div>
            <h2
              className="text-center text-[clamp(2.5rem,7vw,6rem)] text-[#f5f0e8] leading-none"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              Showreel
            </h2>
          </div>

          {/* Local Video Showreel */}
          <div className="relative block w-full aspect-video bg-zinc-900 border border-white/8 group overflow-hidden hover-lift amber-glow transition-all duration-500">
            <video
              ref={videoRef}
              src="/videos/Showreel.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
            />
            
            {/* Visual gradient overlays to match site aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-transparent to-zinc-950/40 pointer-events-none" />
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Disabled Mute Button Option */}
            <button
              disabled
              className="absolute bottom-5 right-5 flex items-center gap-2 px-3 py-1.5 bg-black/70 border border-white/10 text-gray-500 cursor-not-allowed backdrop-blur-sm"
              title="Audio is disabled"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
              <span className="text-[10px] tracking-widest uppercase">Muted</span>
            </button>

            {/* Bottom Left Status Badge */}
            <div className="absolute bottom-5 left-6 flex items-center gap-2 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400/60 text-[10px] tracking-wider uppercase">Auto-playing</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="py-24 bg-black relative z-10" ref={categoriesSection.ref}>
        <div className="max-w-5xl mx-auto px-6">
          <div
            className={`flex flex-col items-center mb-16 transition-all duration-700 ${
              categoriesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber-400/50" />
              <p
                className="text-amber-400 text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                What I Cover
              </p>
              <div className="w-8 h-px bg-amber-400/50" />
            </div>
            <h2
              className="text-center text-[clamp(2.5rem,7vw,6rem)] text-[#f5f0e8] leading-none"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              Categories
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat, i) => (
              <div
                key={cat}
                className={`border border-white/8 px-4 py-5 text-center group hover:border-amber-400/40 hover:bg-amber-400/[0.03] transition-all duration-400 cursor-default ${
                  categoriesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: categoriesSection.inView ? `${i * 60}ms` : "0ms",
                  transitionDuration: "600ms",
                  transitionProperty: "opacity, transform, border-color, background-color",
                }}
              >
                <span className="text-gray-500 text-xs tracking-wide group-hover:text-gray-300 transition-colors duration-300">
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Skills ─── */}
      <section
        className="relative py-28 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundAttachment: "fixed",
        }}
        ref={skillsSection.ref}
      >
        <div className="absolute inset-0 bg-black/85" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div
            className={`flex flex-col items-center mb-16 transition-all duration-700 ${
              skillsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber-400/50" />
              <p
                className="text-amber-400 text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Tools of the Trade
              </p>
              <div className="w-8 h-px bg-amber-400/50" />
            </div>
            <h2
              className="text-center text-[clamp(2.5rem,7vw,6rem)] text-[#f5f0e8] leading-none"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              Skills
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-20">
            {skills.map((skill, i) => (
              <div
                key={skill}
                className={`px-6 py-3 border border-amber-400/30 text-amber-300/80 text-xs tracking-widest hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-300 cursor-default uppercase ${
                  skillsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: skillsSection.inView ? `${i * 80}ms` : "0ms",
                  transitionDuration: "600ms",
                  transitionProperty: "opacity, transform, background-color, border-color, color",
                }}
              >
                {skill}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-10 justify-center">
            <div className="w-16 h-px bg-white/10" />
            <p
              className="text-gray-500 text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Editing Styles
            </p>
            <div className="w-16 h-px bg-white/10" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {styles.map((style, i) => (
              <div
                key={style}
                className={`px-5 py-2.5 bg-white/[0.03] border border-white/10 text-gray-400 text-xs tracking-widest hover:text-white hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 cursor-default ${
                  skillsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: skillsSection.inView ? `${(i + 5) * 80}ms` : "0ms",
                  transitionDuration: "600ms",
                  transitionProperty: "opacity, transform, background-color, border-color, color",
                }}
              >
                {style}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 bg-zinc-950 text-center relative overflow-hidden" ref={ctaSection.ref}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(ellipse at 50% 100%, #fbbf24 0%, transparent 70%)",
          }}
        />
        <div
          className={`max-w-2xl mx-auto px-6 relative z-10 transition-all duration-800 ${
            ctaSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-8 h-px bg-amber-400/50" />
            <p
              className="text-amber-400 text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to elevate your content?
            </p>
            <div className="w-8 h-px bg-amber-400/50" />
          </div>
          <h2
            className="text-[clamp(2.5rem,7vw,5rem)] text-[#f5f0e8] mb-6 leading-none"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            Let's Work Together
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md mx-auto">
            I'll give my all to your videos, no matter the size of the project.
            Let's create something extraordinary.
          </p>
          <button
            onClick={() => navigate("contact")}
            className="group px-10 py-4 bg-amber-400 text-black text-xs tracking-widest uppercase font-semibold hover:bg-amber-300 transition-all duration-300 relative overflow-hidden"
          >
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
}