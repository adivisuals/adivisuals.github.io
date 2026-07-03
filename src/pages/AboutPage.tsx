import type { Page } from "@/App";
import { site } from "@/data/content";
import { useInView } from "@/hooks/useInView";
import heroBg from "@/assets/hero-bg.jpg";

interface AboutPageProps {
  navigate: (page: Page) => void;
}

const timeline = [
  {
    year: "Middle School",
    title: "The Beginning",
    desc: "Started editing for fun — anime edits, AMVs, experimenting with effects. Fell in love with the craft.",
  },
  {
    year: "Growth Phase",
    title: "Learning the Tools",
    desc: "Mastered CapCut and Alight Motion, then leveled up to Premiere Pro, After Effects, and DaVinci Resolve.",
  },
  {
    year: "Today",
    title: "The Pursuit of Excellence",
    desc: "Now focused on becoming the best in the field — taking on projects across all categories with 100% effort every time.",
  },
];

// First three rows are driven by the CMS (Site Settings → Stats) so they stay in
// sync with the Home and Work pages. The rest are kept as fixed counts.
const glanceStats = [
  { label: "Videos Published", value: site.stats.videos },
  { label: "Total Views", value: site.stats.views },
  { label: "Total Likes", value: site.stats.likes },
  { label: "Tools Mastered", value: "5" },
  { label: "Categories Covered", value: "8" },
  { label: "Editing Styles", value: "6" },
];

export default function AboutPage({ navigate }: AboutPageProps) {
  const storySection = useInView<HTMLDivElement>();
  const timelineSection = useInView<HTMLDivElement>();
  const valuesSection = useInView<HTMLDivElement>();

  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-end justify-start pt-16 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
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
              My Story
            </p>
          </div>
          <h1
            className="animate-fade-in-up delay-100 text-[clamp(4rem,14vw,10rem)] leading-[0.88] tracking-tight text-[#f5f0e8]"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            About
            <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(245,240,232,0.5)" }}>
              &nbsp;Me
            </span>
          </h1>
          <p className="animate-fade-in-up delay-200 text-gray-400 text-sm mt-6 max-w-sm leading-relaxed">
            {site.heroTagline}
          </p>
        </div>
      </section>

      {/* My Story */}
      <section className="py-28 bg-black" ref={storySection.ref}>
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div
            className={`transition-all duration-800 ${
              storySection.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber-400/60" />
              <p
                className="text-amber-400 text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Origins
              </p>
            </div>
            <h2
              className="text-[clamp(2.5rem,6vw,4.5rem)] text-[#f5f0e8] leading-none mb-8"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              My Story
            </h2>
            <div className="space-y-5">
              <p className="text-gray-400 text-sm leading-[1.9] font-light">
                I started editing in middle school, just for fun. I edited anime edits at that time —
                crafting AMVs and experimenting with effects, learning by doing.
              </p>
              <p className="text-gray-400 text-sm leading-[1.9] font-light">
                Editing has always been very close to me. It's more than a skill —
                it's how I see the world and tell stories. Now, I aspire to become
                the best in my field.
              </p>
              <p className="text-gray-300 text-sm leading-[1.9] font-light italic border-l-2 border-amber-400/40 pl-4">
                "This is my passion, and I always give it my all, even on small projects.
                I'll be glad to give my all to your videos too."
              </p>
            </div>
          </div>

          {/* Right — Stats card */}
          <div
            className={`transition-all duration-800 delay-200 ${
              storySection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-white/8 p-8 bg-zinc-950/60">
              <p className="text-gray-600 text-[10px] tracking-[0.4em] uppercase mb-8">At a Glance</p>
              <div className="space-y-6">
                {glanceStats.map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-none last:pb-0">
                    <span className="text-gray-500 text-xs tracking-wide">{label}</span>
                    <span
                      className="text-[#f5f0e8] text-2xl leading-none"
                      style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-zinc-950" ref={timelineSection.ref}>
        <div className="max-w-4xl mx-auto px-6">
          <div
            className={`flex flex-col items-center mb-16 transition-all duration-700 ${
              timelineSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber-400/50" />
              <p
                className="text-amber-400 text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Journey
              </p>
              <div className="w-8 h-px bg-amber-400/50" />
            </div>
            <h2
              className="text-center text-[clamp(2.5rem,7vw,5rem)] text-[#f5f0e8] leading-none"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              How I Got Here
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/8 md:-translate-x-px" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} transition-all duration-700 ${
                    timelineSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-amber-400 rounded-full -translate-x-1 md:-translate-x-1.5 mt-1.5 z-10 ring-4 ring-zinc-950" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="border border-white/8 p-6 hover:border-amber-400/20 transition-colors duration-300 bg-black/40">
                      <span className="text-amber-400/60 text-[10px] tracking-[0.4em] uppercase block mb-2">
                        {item.year}
                      </span>
                      <h3
                        className="text-[#f5f0e8] text-xl mb-3"
                        style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.08em" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="relative py-28 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        ref={valuesSection.ref}
      >
        <div className="absolute inset-0 bg-black/88" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div
            className={`flex flex-col items-center mb-16 transition-all duration-700 ${
              valuesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber-400/50" />
              <p
                className="text-amber-400 text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                What Drives Me
              </p>
              <div className="w-8 h-px bg-amber-400/50" />
            </div>
            <h2
              className="text-center text-[clamp(2.5rem,7vw,5rem)] text-[#f5f0e8] leading-none"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              My Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "✦",
                title: "Passion First",
                desc: "Every project gets 100% of my effort. No exceptions. Editing isn't just work — it's who I am.",
              },
              {
                icon: "◈",
                title: "Attention to Detail",
                desc: "From the first cut to the final color grade, every frame matters. I don't rush perfection.",
              },
              {
                icon: "⬡",
                title: "Always Improving",
                desc: "The pursuit of mastery never ends. I'm constantly studying, practicing, and pushing my limits.",
              },
            ].map((v, i) => (
              <div
                key={v.title}
                className={`border border-white/8 p-7 hover:border-amber-400/20 transition-all duration-500 group ${
                  valuesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="text-amber-400/50 text-xl block mb-5 group-hover:text-amber-400 transition-colors duration-300">
                  {v.icon}
                </span>
                <h3
                  className="text-[#f5f0e8] text-lg mb-3"
                  style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.08em" }}
                >
                  {v.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-center">
        <div className="max-w-xl mx-auto px-6">
          <p
            className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to collaborate?
          </p>
          <h2
            className="text-[clamp(2rem,6vw,4rem)] text-[#f5f0e8] mb-6 leading-none"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            Let's Create Together
          </h2>
          <button
            onClick={() => navigate("contact")}
            className="px-8 py-3.5 bg-amber-400 text-black text-xs tracking-widest uppercase font-semibold hover:bg-amber-300 transition-colors duration-300"
          >
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
}
