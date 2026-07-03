// src/components/Footer.tsx
import type { Page } from "@/App";
import { site } from "@/data/content";
import SocialIcons from "@/components/SocialIcons";

interface FooterProps {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-black border-t border-white/5 py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-3 group"
          >
            <img
              src={site.logo}
              alt="Aditya Vishwakarma"
              className="w-8 h-8 object-cover group-hover:opacity-90 transition-opacity duration-300"
            />
            <span className="text-gray-500 text-xs tracking-[0.3em] uppercase group-hover:text-gray-300 transition-colors duration-300">
              ADITYA VISHWARKARMA
            </span>
          </button>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {(["home", "work", "about", "contact"] as Page[]).map((page) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                className="text-gray-600 text-xs tracking-widest uppercase hover:text-amber-400 transition-colors duration-300 capitalize"
              >
                {page}
              </button>
            ))}
          </div>

          {/* Social — YouTube, Instagram, X (configured in CMS) */}
          <SocialIcons />
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-700 text-xs tracking-wide">
            © 2026 · Video Editor Portfolio · All rights reserved
          </p>
          <p
            className="text-gray-700 text-xs tracking-widest italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Crafted with passion
          </p>
        </div>
      </div>
    </footer>
  );
}