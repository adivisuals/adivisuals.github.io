import { useState, useMemo } from "react";
import type { Page } from "@/App";
import { projects, workStatLine } from "@/data/content";
import { useInView } from "@/hooks/useInView";
import heroBg from "@/assets/hero-bg.jpg";

interface WorkPageProps {
  navigate: (page: Page) => void;
}

export default function WorkPage({ navigate }: WorkPageProps) {
  const gridSection = useInView<HTMLDivElement>();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.style).filter(Boolean)))],
    []
  );

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.style === activeFilter || p.category.includes(activeFilter));

  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex items-end justify-start pt-16 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
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
              Portfolio
            </p>
          </div>
          <h1
            className="animate-fade-in-up delay-100 text-[clamp(4rem,14vw,10rem)] leading-[0.88] tracking-tight text-[#f5f0e8]"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            My
            <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(245,240,232,0.5)" }}>
              &nbsp;Work
            </span>
          </h1>
          <p className="animate-fade-in-up delay-200 text-gray-400 text-sm mt-6 max-w-sm leading-relaxed">
            {workStatLine}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="border-b border-white/5 bg-zinc-950 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-300 ${
                activeFilter === f
                  ? "bg-amber-400 text-black font-semibold"
                  : "border border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 bg-black" ref={gridSection.ref}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project, i) => {
              const cardInner = (
                <>
                  {/* Thumbnail */}
                  <div className="aspect-video relative overflow-hidden bg-zinc-900">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(135deg, ${project.color} 0%, #0a0a0a 100%)` }}
                      />
                    )}
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 bg-black/30">
                      <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-[10px] text-gray-300 tracking-wider">
                      {project.duration}
                    </div>
                    <div className="absolute top-2 left-2 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 text-[10px] text-amber-400/70 tracking-wider">
                      {project.year}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 bg-zinc-950">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3
                        className="text-[#f5f0e8] text-base leading-tight group-hover:text-amber-400/90 transition-colors duration-300"
                        style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.06em", fontSize: "1.1rem" }}
                      >
                        {project.title}
                      </h3>
                      <span className="text-gray-600 text-[10px] tracking-widest uppercase whitespace-nowrap mt-0.5 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        </svg>
                        {project.views} views · {project.likes} Likes
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] tracking-widest uppercase text-gray-600 border border-white/8 px-2 py-0.5">
                        {project.category}
                      </span>
                      <span className="text-[10px] tracking-widest uppercase text-amber-500/50 border border-amber-400/10 px-2 py-0.5">
                        {project.style}
                      </span>
                    </div>
                    {project.description && (
                      <p className="text-gray-500 text-xs leading-relaxed mt-2">{project.description}</p>
                    )}
                  </div>
                </>
              );

              const commonClass = `group relative cursor-pointer overflow-hidden border border-white/6 hover:border-amber-400/25 transition-all duration-500 hover-lift amber-glow ${
                gridSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`;
              const styleProp = {
                transitionDelay: gridSection.inView ? `${i * 80}ms` : "0ms",
                transitionProperty: "opacity, transform, border-color, box-shadow",
                transitionDuration: "600ms",
              };

              return project.videoUrl ? (
                <a
                  key={`${project.title}-${i}`}
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={commonClass}
                  style={styleProp}
                  aria-label={`Watch ${project.title}`}
                >
                  {cardInner}
                </a>
              ) : (
                <div key={`${project.title}-${i}`} className={commonClass} style={styleProp}>
                  {cardInner}
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-sm tracking-widest uppercase">No videos match this filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-zinc-950 text-center border-t border-white/5">
        <div className="max-w-xl mx-auto px-6">
          <p
            className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Like what you see?
          </p>
          <h2
            className="text-[clamp(2rem,6vw,4rem)] text-[#f5f0e8] mb-6 leading-none"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            Let's Build Yours
          </h2>
          <button
            onClick={() => navigate("contact")}
            className="px-8 py-3.5 bg-amber-400 text-black text-xs tracking-widest uppercase font-semibold hover:bg-amber-300 transition-colors duration-300"
          >
            Start a Project
          </button>
        </div>
      </section>
    </div>
  );
}