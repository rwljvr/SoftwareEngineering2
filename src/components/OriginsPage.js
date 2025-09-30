import React, { useState } from "react";
import { Element } from "react-scroll";
import {
  ScrollText,
  BookOpen,
  AlertTriangle,
  GraduationCap,
  Paintbrush,
  RefreshCcw,
  X
} from "lucide-react"; // Lucide icons
import "./OriginsPage.css";

// HistoryPage class following the class diagram
class HistoryPage {
  constructor() {
    this.pageID = 3;
    this.title = "History of Baybayin";
    this.content = "Timeline of Baybayin's historical development";
  }

  loadHistoryData() {
    return [
      {
        date: "Pre-1500s",
        title: "Ancient Origins",
        details:
          "Baybayin, one of the ancient pre-colonial writing systems used by early Filipinos, comes from the Tagalog root word baybay, which means to spell. It dates back way before the Spaniards reached our shores through the 16th century.",
        icon: <ScrollText size={28} />
      },
      {
        date: "1500s-1600s",
        title: "Spanish Colonial Period",
        details:
          "During Spanish colonization, Baybayin usage began to decline as the Spanish introduced the Latin alphabet and discouraged indigenous writing systems.",
        icon: <BookOpen size={28} />
      },
      {
        date: "1700s-1800s",
        title: "Near Extinction",
        details:
          "Baybayin nearly disappeared as Spanish education and religious conversion efforts replaced traditional Filipino literacy with European writing systems.",
        icon: <AlertTriangle size={28} />
      },
      {
        date: "1900s-1970s",
        title: "Academic Revival",
        details:
          "Scholars and historians began documenting and studying Baybayin, preserving it as an important part of Filipino cultural heritage.",
        icon: <GraduationCap size={28} />
      },
      {
        date: "1980s-2000s",
        title: "Cultural Renaissance",
        details:
          "Baybayin experienced renewed interest among Filipino artists, cultural groups, and educators seeking to reconnect with pre-colonial identity.",
        icon: <Paintbrush size={28} />
      },
      {
        date: "2009-Present",
        title: "Modern Revival",
        details:
          "The use of Baybayin has reemerged in recent years. Various government and non-government organizations, cultural groups, artists, and others have revived this ancient writing system. It has also been used in public places such as airports and new coffee shops.",
        icon: <RefreshCcw size={28} />
      }
    ];
  }

  showHistory() {
    return this.loadHistoryData();
  }

  renderContent() {
    return this.showHistory();
  }

  navigateTo(pageID) {
    console.log(`Navigating to page ${pageID}`);
  }
}

export default function OriginsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const historyPage = new HistoryPage();
  const timelineData = historyPage.renderContent();

  const handleDateClick = (index) => {
    setSelectedEvent(selectedEvent === index ? null : index);
  };

  return (
    <Element name="origins">
      <div className="origins-page">
        <div className="hero-content">
          <h1 className="main-title">{historyPage.title.toUpperCase()}</h1>
          <p className="subtitle">
            Discover the history and cultural significance of Baybayin,
            an ancient pre-colonial Philippine script.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          <div className="timeline-line"></div>

          <div className="timeline-events-wrapper">
            {timelineData.map((event, index) => (
              <div key={index} className="timeline-event">
                <div
                  className={`timeline-dot ${
                    selectedEvent === index ? "active" : ""
                  }`}
                  onClick={() => handleDateClick(index)}
                >
                  <div className="timeline-icon">{event.icon}</div>
                  <div className="timeline-date">{event.date}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Details Panel */}
          {selectedEvent !== null && (
            <div className="timeline-details">
              <div className="details-content">
                <h3>{timelineData[selectedEvent].title}</h3>
                <p>{timelineData[selectedEvent].details}</p>
                <button
                  className="close-btn"
                  onClick={() => setSelectedEvent(null)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Element>
  );
}
