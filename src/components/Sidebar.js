import React, { useState } from "react";
import { Link } from "react-scroll";
import {
  Globe,
  Twitter,
  Facebook,
  Instagram,
  Home,
  Info,
  BookOpen,
  ShoppingBag,
  Menu,
} from "lucide-react";
import "./Sidebar.css";
import badgeLogo from "../assets/images/badge-logo.png";

export default function Sidebar({ onToggle }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
    if (onToggle) onToggle(!collapsed); // notify parent
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Collapse Button */}
      <button className="collapse-btn" onClick={handleToggle}>
        <Menu size={20} />
      </button>

      {/* Header Section */}
      <div className="sidebar-header">
        <div className="logo">
          <Link to="home" smooth={true} duration={500} spy={true}>
            <img src={badgeLogo} alt="CSA9 Logo" className="logo-img" />
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        <Link
          to="home"
          smooth={true}
          duration={500}
          spy={true}
          activeClass="active-link"
        >
          <Home className="nav-icon" size={20} />
          <span>Home</span>
        </Link>

        <Link
          to="about"
          smooth={true}
          duration={600}
          spy={true}
          activeClass="active-link"
        >
          <Info className="nav-icon" size={20} />
          <span>About</span>
        </Link>

        <Link
          to="origins"
          smooth={true}
          duration={600}
          spy={true}
          activeClass="active-link"
        >
          <BookOpen className="nav-icon" size={20} />
          <span>Origins</span>
        </Link>

        <Link
          to="merch"
          smooth={true}
          duration={600}
          spy={true}
          activeClass="active-link"
        >
          <ShoppingBag className="nav-icon" size={20} />
          <span>Merch</span>
        </Link>
      </nav>

      {/* Footer / Socials */}
      <div className="sidebar-bottom">
        <div className="csa9-box">Share this!</div>
        <div className="socials">
          {/* 🌐 Website */}
          <a
            href="https://filipinomuna.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit our website"
          >
            <Globe size={18} />
          </a>

          {/* 🐦 Twitter / X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              "Check out Filipino Muna! 🇵🇭 Learn Baybayin and Filipino culture:"
            )}&url=${encodeURIComponent("https://filipinomuna.vercel.app")}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Twitter"
          >
            <Twitter size={18} />
          </a>

          {/* 📘 Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61582079500091"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit our Facebook page"
          >
            <Facebook size={18} />
          </a>

          {/* 📸 Instagram */}
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Instagram (copy link manually)"
          >
            <Instagram size={18} />
          </a>
        </div>

        <div className="sidebar-footer">© 2025 Filipino Muna</div>
      </div>
    </div> // ✅ properly closes the outer sidebar div
  );
}
