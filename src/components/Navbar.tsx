import { useState, useEffect } from "react";
import type { Page } from "@/App";
import { site } from "@/data/content";

interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const links: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Work", page: "work" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPage]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2 group"
          >
            <img
              src={site.logo}
              alt="Aditya Vishwakarma"
              style={{ width: `${site.logoSize}px`, height: `${site.logoSize}px` }}
              className="object-cover group-hover:opacity-90 transition-opacity duration-300"
            />
            <span
              className="text-[#f5f0e8] text-sm tracking-[0.2em] uppercase font-light hidden sm:block group-hover:text-amber-400/80 transition-colors duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                className={`nav-link text-xs tracking-[0.25em] uppercase transition-colors duration-300 ${
                  currentPage === page
                    ? "text-amber-400"
                    : "text-gray-400 hover:text-white"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => navigate("contact")}
              className="px-5 py-2 border border-amber-400/40 text-amber-400 text-xs tracking-widest uppercase hover:bg-amber-400 hover:text-black transition-all duration-300"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.97)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex flex-col items-center gap-8">
          {links.map(({ label, page }, i) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`text-4xl tracking-widest uppercase transition-colors duration-300 ${
                currentPage === page ? "text-amber-400" : "text-gray-200 hover:text-amber-400"
              }`}
              style={{
                fontFamily: "'Bebas Neue', cursive",
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms`,
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}