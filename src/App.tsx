import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import WorkPage from "@/pages/WorkPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

export type Page = "home" | "work" | "about" | "contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState<Page>("home");

  const navigate = (page: Page) => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setDisplayPage(page);
      setCurrentPage(page);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 280);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
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
