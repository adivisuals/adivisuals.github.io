import { useState, useEffect } from "react";
import { startSmoothScroll, scrollToTop } from "@/lib/smoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import WorkPage from "@/pages/WorkPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import { useSEO } from "@/hooks/useSEO";

export type Page = "home" | "work" | "about" | "contact";

const seoData: Record<Page, { title: string; desc: string }> = {
  home: {
    title: "Aditya Vishwakarma | Video Editor Portfolio",
    desc: "Professional video editor specializing in Business, Tech, and Entertainment. View my work and let's create something extraordinary.",
  },
  work: {
    title: "Work & Showreel | Video Editor Portfolio",
    desc: "Explore my video editing portfolio across various categories including tech, finance, sports, and more. 52K+ views, 1K+ likes.",
  },
  about: {
    title: "About Me | Video Editor Portfolio",
    desc: "Learn about my journey as a video editor, my skills in Premiere Pro and After Effects, and my passion for storytelling.",
  },
  contact: {
    title: "Contact | Video Editor Portfolio",
    desc: "Get in touch to elevate your content. Available for new video editing projects and collaborations.",
  },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState<Page>("home");

  useSEO(seoData[currentPage].title, seoData[currentPage].desc);

  useEffect(() => {
    return startSmoothScroll();
  }, []);

  const navigate = (page: Page) => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setDisplayPage(page);
      setCurrentPage(page);
      setIsTransitioning(false);
      scrollToTop(true);
    }, 280);
  };

  useEffect(() => {
    scrollToTop(true);
  }, []);

  const renderPage = () => {
    switch (displayPage) {
      case "home":
        return <HomePage navigate={navigate} />;
      case "work":
        return <WorkPage navigate={navigate} />;
      case "about":
        return <AboutPage navigate={navigate} />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Global film-grain overlay */}
      <div className="grain-overlay" />

      <Navbar currentPage={currentPage} navigate={navigate} />

      <main
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "translateY(12px)" : "translateY(0)",
          transition: "opacity 0.28s ease, transform 0.28s ease",
        }}
      >
        {renderPage()}
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}