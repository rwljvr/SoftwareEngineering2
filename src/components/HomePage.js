// File: src/components/HomePage.js
import { scroller } from "react-scroll";
import React from "react";
import { motion } from "framer-motion";
import Page from "./Page";
import "./HomePage.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

class HomePage extends Page {
  constructor(props) {
    super(props);
    this.id = "home";
    this.title = "Filipino Muna: A Web-based Preservation Project";
    this.content = "Home content";
  }

  // ✅ SOLUTION 1: Improved scroll function with better offset calculation
  scrollToSection = (section) => {
    // Calculate proper offset based on viewport and sidebar
    const isMobile = window.innerWidth <= 768;
    const sidebarWidth = isMobile ? 0 : 220; // Sidebar is hidden on mobile
    const additionalOffset = 20; // Extra padding for better positioning
    
    scroller.scrollTo(section, {
      duration: 1200,
      delay: 100,
      smooth: "easeInOutQuart",
      spy: true,
      offset: -(additionalOffset), // Negative offset to scroll a bit past the target
      // Alternative: Use containerId if your scroll container is not window
      // containerId: 'main-container'
    });
  };

  // ✅ SOLUTION 2: Alternative scroll method using native scrollIntoView
  scrollToSectionNative = (section) => {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const element = document.querySelector(`[name="${section}"]`);
      if (element) {
        // Get the element's position
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        
        // Calculate offset for sidebar (only on desktop)
        const isMobile = window.innerWidth <= 768;
        const offset = isMobile ? 80 : 100; // Adjust these values as needed
        
        // Scroll to calculated position
        window.scrollTo({
          top: absoluteElementTop - offset,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  // ✅ SOLUTION 3: Hybrid approach - try react-scroll first, fallback to native
  scrollToSectionHybrid = (section) => {
    // Try react-scroll first
    scroller.scrollTo(section, {
      duration: 1000,
      delay: 0,
      smooth: "easeInOutQuart",
      spy: true,
      offset: -80, // Adjust this value based on your needs
    });

    // Fallback: Fine-tune position after react-scroll completes
    setTimeout(() => {
      const element = document.querySelector(`[name="${section}"]`);
      if (element) {
        const rect = element.getBoundingClientRect();
        // If element is not properly positioned, adjust
        if (rect.top < 50 || rect.top > 150) {
          const currentScroll = window.pageYOffset;
          const elementTop = rect.top + currentScroll;
          const targetScroll = elementTop - 80;
          
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      }
    }, 1100); // After react-scroll animation completes
  };

  // Override the base renderContent method
  renderContent() {
    return (
      <div className="homepage">
        {/* Header Title */}
        <motion.header
          className="homepage-header"
          variants={fadeInUp}
          initial="hidden"
          animate="show"
        >
          <h1>{this.title}</h1>
        </motion.header>

        {/* Main Content */}
        <motion.main
          className="content"
          id="home"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
        >
          <section id="intro">
            <motion.h3 variants={fadeInUp}>
              Reviving an Ancient Filipino Writing System
            </motion.h3>
            <motion.div className="separator" variants={fadeInUp}></motion.div>

            <motion.p variants={fadeInUp}>
              Explore the history, cultural significance, and modern revival of
              Baybayin, the pre-colonial script of the Philippines.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Once used as a primary means of communication before Spanish
              colonization, Baybayin is more than just letters—it is a reflection
              of Filipino identity, creativity, and resilience. Today, we aim to
              bring it closer to modern audiences through interactive learning,
              research, and community-driven projects.
            </motion.p>

            <motion.p variants={fadeInUp}>
              This platform is not only a resource to study Baybayin, but also a
              call to preserve, embrace, and celebrate our cultural roots. By
              blending history with technology, we keep alive a legacy that
              belongs to every Filipino.
            </motion.p>

            <motion.div className="buttons" variants={fadeInUp}>
              {/* ✅ Using the hybrid scroll method for better reliability */}
              <button
                className="btn-yellow"
                onClick={() => this.scrollToSectionHybrid("about")}
              >
                Learn Baybayin
              </button>

              <button
                className="btn-green"
                onClick={() => this.scrollToSectionHybrid("origins")}
              >
                Explore History
              </button>
            </motion.div>
          </section>
        </motion.main>
      </div>
    );
  }

  // Method specific to HomePage (from your class diagram)
  displayNavigation() {
    return ["about", "origins", "merchandise"];
  }
}

export default HomePage;