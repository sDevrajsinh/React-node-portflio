import React, { useEffect } from "react";
import "./style.css";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import Particles from "./components/Particles";
import CustomCursor from "./components/CustomCursor";
import { Routes, Route, useLocation } from "react-router-dom";
import { trackVisitorData } from "./services/apiService";
import Login from "./components/Admin/Login";
import Dashboard from "./components/Admin/Dashboard";
import ProtectedRoute from "./components/Admin/ProtectedRoute";

/**
 * Main Application Component
 * Handles:
 * - Smooth scrolling for anchor links
 * - Page loaded state
 * - Layout rendering
 */

function App() {
  const location = useLocation();

  useEffect(() => {
    // Visitor Tracking
    const trackVisitor = async () => {
      // Don't track if on admin pages or if logged in as admin
      if (location.pathname.startsWith('/admin') || localStorage.getItem('adminToken')) {
        return;
      }
      
      try {
        await trackVisitorData({
          page: location.pathname,
          deviceType: /Mobile|Tablet/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
          browserInfo: navigator.userAgent
        });
      } catch (err) {
        console.error('Tracking failed', err);
      }
    };
    trackVisitor();

    if (location.pathname.startsWith('/admin')) return;

    // Smooth scrolling handler
    const handleSmoothScroll = (event) => {
      const targetId = event.currentTarget.getAttribute("href");

      if (targetId?.startsWith("#")) {
        event.preventDefault();

        const targetElement = document.querySelector(targetId);

        targetElement?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    // Select all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    // Attach event listeners
    anchorLinks.forEach((link) =>
      link.addEventListener("click", handleSmoothScroll)
    );

    // Add page loaded class
    document.body.classList.add("loaded");

    // Developer console message
    console.info("🚀 Devraj Solanki Portfolio Loaded Successfully!");

    // Cleanup function
    return () => {
      anchorLinks.forEach((link) =>
        link.removeEventListener("click", handleSmoothScroll)
      );
    };
  }, [location]);

  const PortfolioLayout = () => (
    <>
      <div className="bg-animation" />
      <Particles />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );

  return (
    <div className="app-container">
      <CustomCursor />
      <Routes>
        <Route path="/" element={<PortfolioLayout />} />
        <Route path="/admin" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;