import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomScrollbar from "../components/CustomScrollbar";
import useSmoothScroll from "../hooks/useSmoothScroll";
import Loader from "../components/Loader";

export default function MainLayout() {
  useSmoothScroll();

  const [isLoading, setIsLoading] = useState(() => {
    // Show loader only once per session
    return !sessionStorage.getItem("prographr_loaded");
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem("prographr_loaded", "true");
    setIsLoading(false);
  };

  // Lock scroll while loader is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <CustomScrollbar />
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}