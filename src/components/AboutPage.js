// File: src/components/AboutPage.js
import React from "react";
import { Element } from "react-scroll";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./AboutPage.css";

import Page from "./Page";
import ImageGallery from "./ImageGallery";

// Other gallery images
import sec1 from "../assets/images/sec1.jpg";
import sec2 from "../assets/images/sec2.jpg";
import sec3 from "../assets/images/sec3.jpg";

// Baybayin characters
import char1 from "../assets/images/1.jpg";
import char2 from "../assets/images/2.jpg";
import char3 from "../assets/images/3.jpg";
import char4 from "../assets/images/4.jpg";
import char5 from "../assets/images/5.jpg";
import char6 from "../assets/images/6.jpg";
import char7 from "../assets/images/7.jpg";
import char8 from "../assets/images/8.jpg";
import char9 from "../assets/images/9.jpg";
import char10 from "../assets/images/10.jpg";
import char11 from "../assets/images/11.jpg";
import char12 from "../assets/images/12.jpg";
import char13 from "../assets/images/13.jpg";
import char14 from "../assets/images/14.jpg";
import char15 from "../assets/images/15.jpg";

// Pronunciation GIF - add more as you get them
import baGif from "../assets/images/BA.gif";

const baybayinChars = [
  char1, char2, char3, char4, char5,
  char6, char7, char8, char9, char10,
  char11, char12, char13, char14, char15
];

// FlipCard Component with Modal
const FlipCard = ({ frontImage, backImage, index, onOpenModal }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div
      className="flip-card-container"
      style={{
        width: '55px',
        height: '55px',
        perspective: '1000px',
        cursor: 'pointer'
      }}
    >
      <div
        className="flip-card-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front - Baybayin Character */}
        <div
          className="flip-card-front"
          onClick={() => onOpenModal(frontImage, backImage, index)}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '5px',
            padding: '4px',
            boxShadow: '0 2px 8px rgba(219, 192, 132, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(219, 192, 132, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(219, 192, 132, 0.3)';
          }}
        >
          <img
            src={frontImage}
            alt={`Baybayin Character ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Back - Pronunciation GIF */}
        <div
          className="flip-card-back"
          onClick={() => setIsFlipped(false)}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, rgba(219, 192, 132, 0.2), rgba(244, 215, 153, 0.15))',
            borderRadius: '5px',
            padding: '4px',
            boxShadow: '0 2px 8px rgba(219, 192, 132, 0.4)',
            transform: 'rotateY(180deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(219, 192, 132, 0.5)'
          }}
        >
          <img
            src={backImage}
            alt={`Pronunciation ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
    </div>
  );
};

class AboutPage extends Page {
  constructor(props) {
    super({
      ...props,
      pageID: 2,
      title: "About Baybayin",
      content: "About Page Content",
    });

    this.state = {
      showBaybayin: true,
      showHouseBill: false,
      currentSlide: 0,
      selectedCharacter: null,
      showModal: false,
    };

    this.swiperInstance = null;
  }

  openCharacterModal = (frontImage, backImage, index) => {
    this.setState({
      selectedCharacter: { 
        frontImage: frontImage,
        backImage: backImage,
        index: index + 1 
      },
      showModal: true
    });
  }

  closeCharacterModal = () => {
    this.setState({
      selectedCharacter: null,
      showModal: false
    });
  }

  showAboutBaybayin() {
    this.setState({ showBaybayin: true, showHouseBill: false, currentSlide: 0 });
    if (this.swiperInstance) this.swiperInstance.slideTo(0, 0);
  }

  showHouseBill() {
    this.setState({ showBaybayin: false, showHouseBill: true, currentSlide: 5 });
    if (this.swiperInstance) this.swiperInstance.slideTo(5, 0);
  }

  renderContent() {
    return (
      <Element name="about" className="about-section">
        {/* Header */}
        <div className="about-header">
          <h1 className="main-title">BAYBAYIN</h1>
          <div className="separator-bar"></div>
          <p className="slogan">
            Preserve. Protect. Pass On — Filipino Muna.
          </p>
        </div>

        {/* Dark box content */}
        <div className="about-container">
          <div className="content-nav">
            <button
              onClick={() => this.showAboutBaybayin()}
              className={this.state.showBaybayin ? "active" : ""}
            >
              Learn Baybayin
            </button>
            <button
              onClick={() => this.showHouseBill()}
              className={this.state.showHouseBill ? "active" : ""}
            >
              House Bill 1022
            </button>
          </div>

          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation
            slidesPerView={1}
            autoHeight={true}
            className="about-swiper"
            initialSlide={this.state.currentSlide}
            onSwiper={(swiper) => (this.swiperInstance = swiper)}
            onSlideChange={(swiper) => {
              this.setState({ currentSlide: swiper.activeIndex });
              if (swiper.activeIndex <= 4) {
                this.setState({ showBaybayin: true, showHouseBill: false });
              } else {
                this.setState({ showBaybayin: false, showHouseBill: true });
              }
            }}
          >
            {/* Slide 1 - What is Baybayin */}
            <SwiperSlide>
              <div className="content small-text">
                <h3>WHAT IS BAYBAYIN?</h3>
                <p>
                  Baybayin is an indigenous Indic script that has been widely used in 
                  traditional Tagalog domains. The term "baybayin" comes from the Tagalog 
                  root word <i>baybay</i>, which means "to spell." This script was primarily 
                  used for personal letters, poetry, and record-keeping.
                </p>
                <p>
                  Each character in Baybayin represents a syllable rather than an individual 
                  letter, making it a syllabic writing system. It reflects the rich cultural 
                  heritage and linguistic traditions of the pre-colonial Philippines.
                </p>
                <p>
                  Historical accounts from Spanish missionaries describe Baybayin as being 
                  widely known among the native population, with both men and women able 
                  to read and write using this script. The script was typically written 
                  on bamboo, bark, or palm leaves using pointed tools or ink made from 
                  natural materials.
                </p>
              </div>
            </SwiperSlide>

            {/* Slide 2 - Brahmic Family Origins */}
            <SwiperSlide>
              <div className="content small-text">
                <h3>BRAHMIC FAMILY ORIGINS</h3>
                <p>
                  Baybayin is a member of the Brahmic family of scripts, which originated 
                  from ancient India. It was used in the 16th century and continued during 
                  Spanish colonization until the late 19th century.
                </p>
                <p>
                  Its Brahmic connection shows how trade and culture spread across Southeast Asia, 
                  linking the Philippines to a bigger history of written traditions.
                </p>
                <p>
                  The script likely arrived in the Philippines through maritime trade routes 
                  that connected the archipelago to the broader Indian Ocean world. Archaeological 
                  evidence suggests that similar scripts were used throughout the Malay world, 
                  indicating a shared cultural and intellectual heritage that predates colonial influences.
                </p>
              </div>
            </SwiperSlide>

            {/* Slide 3 - Related Scripts */}
            <SwiperSlide>
              <div className="content small-text">
                <h3>RELATED PHILIPPINE SCRIPTS</h3>
                <p>
                  Scripts descended from Baybayin include <strong>Hanunuo, Buhid, 
                  Tagbanwa, and Kapampangan</strong>. These are still used by some 
                  indigenous groups today.
                </p>
                <p>
                  Some incorrectly call it "alibata," but the accurate name is Baybayin, 
                  honoring its true Filipino heritage.
                </p>
                <p>
                  The Mangyan people of Mindoro continue to use Hanunuo script for 
                  traditional poetry and literature, while the Tagbanwa people of Palawan 
                  maintain their own variant for ceremonial and cultural purposes. These 
                  living traditions demonstrate the enduring importance of indigenous writing 
                  systems in preserving Filipino cultural identity and knowledge.
                </p>
              </div>
            </SwiperSlide>

            {/* Slide 4 - Four Basic Strokes */}
           <SwiperSlide>
              <div className="content small-text">
                <h3>FOUR BASIC STROKES</h3>
                <p>
                  Baybayin is constructed using four fundamental strokes that form 
                  the foundation of all characters:
                </p>
                <div style={{marginLeft: '20px', lineHeight: '2'}}>
                  <p><strong>1. Inverted S</strong> - A curved stroke resembling an upside-down S</p>
                  <p><strong>2. Wave</strong> - A flowing, wave-like stroke</p>
                  <p><strong>3. No. 3</strong> - A stroke that resembles the number three</p>
                  <p><strong>4. U-Shape</strong> - A curved stroke forming a U shape</p>
                </div>
                <p>
                  Understanding these basic strokes is essential for learning to write 
                  and recognize Baybayin characters properly.
                </p>
                <p>
                  Mastery of these strokes allows for fluid and natural writing, as traditional 
                  scribes would combine them in various ways to create the complete syllabic 
                  characters. The simplicity of these foundational elements made Baybayin 
                  accessible to learners while maintaining the elegant aesthetic that 
                  characterizes this ancient Filipino script.
                </p>
              </div>
            </SwiperSlide>

            {/* Slide 5 - Baybayin Alphabet with Flip Cards */}
            <SwiperSlide>
              <div className="content small-text">
                <h3>BAYBAYIN ALPHABET</h3>
                <div className="alphabet-grid">
                  {baybayinChars.map((char, i) => (
                    <FlipCard
                      key={i}
                      frontImage={char}
                      backImage={i === 0 ? baGif : char}
                      index={i}
                      onOpenModal={this.openCharacterModal}
                    />
                  ))}
                </div>
                <p style={{ marginTop: "10px", textAlign: "center", fontStyle: "italic", fontSize: "0.8em", color: "rgba(219, 192, 132, 0.7)" }}>
                  Click any character to view larger and flip to see how to write it.
                </p>
              </div>
            </SwiperSlide>

            {/* Slide 6 - House Bill 1022 - Enhanced Content */}
            <SwiperSlide>
              <div className="content small-text">
                <h3>HOUSE BILL 1022: NATIONAL WRITING SYSTEM ACT</h3>
                <p>
                  <strong>Signed into law on April 3, 2018</strong>, the National Writing System Act 
                  (Republic Act No. 11022) officially declares Baybayin as the Philippines' national 
                  writing system. This landmark legislation recognizes the cultural and historical 
                  significance of our indigenous script.
                </p>
                <p>
                  <strong>Key Provisions:</strong>
                </p>
                <div style={{marginLeft: '15px', lineHeight: '1.6'}}>
                  <p>• <strong>Educational Integration:</strong> Baybayin to be taught in schools as part of Filipino language curriculum</p>
                  <p>• <strong>Government Use:</strong> Encouraged use in official documents and signage alongside Filipino and English</p>
                  <p>• <strong>Cultural Preservation:</strong> Protection and promotion of Baybayin through various cultural programs</p>
                  <p>• <strong>Research Support:</strong> Funding for studies on Philippine scripts and their historical development</p>
                </div>
                <p>
                  The law aims to strengthen Filipino cultural identity, promote national pride, 
                  and ensure that future generations remain connected to their pre-colonial heritage. 
                  It represents a significant step toward decolonizing Filipino education and culture.
                </p>
              </div>
            </SwiperSlide>

            {/* Slide 7 - Gallery */}
            <SwiperSlide>
              <div className="content">
                <div className="gallery small-images">
                  <ImageGallery images={[sec1, sec2, sec3]} />
                </div>
                <p style={{ marginTop: "10px", textAlign: "center", fontStyle: "italic", fontSize: "0.8em" }}>
                  Modern examples of Baybayin in art, design, and cultural preservation.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Enhanced Character Modal with Flip Functionality */}
        {this.state.showModal && this.state.selectedCharacter && (
          <ModalWithFlip
            character={this.state.selectedCharacter}
            onClose={this.closeCharacterModal}
          />
        )}
      </Element>
    );
  }

  navigateTo() {
    const element = document.querySelector('[name="about"]');
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Modal Component with Flip Card
const ModalWithFlip = ({ character, onClose }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div 
      className="character-modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        cursor: 'pointer',
        backdropFilter: 'blur(3px)'
      }}
    >
      <div 
        className="character-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'transparent',
          borderRadius: '15px',
          padding: '30px',
          maxWidth: '450px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'default'
        }}
      >
        {/* Large Flip Card */}
        <div
          style={{
            width: '300px',
            height: '300px',
            perspective: '1000px',
            marginBottom: '20px'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transition: 'transform 0.6s',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* Front */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                background: 'rgba(255, 255, 255, 0.98)',
                borderRadius: '15px',
                padding: '20px',
                boxShadow: '0 10px 40px rgba(219, 192, 132, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid rgba(219, 192, 132, 0.3)'
              }}
            >
              <img
                src={character.frontImage}
                alt={`Baybayin Character ${character.index}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>

            {/* Back */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(135deg, rgba(219, 192, 132, 0.25), rgba(244, 215, 153, 0.2))',
                borderRadius: '15px',
                padding: '20px',
                boxShadow: '0 10px 40px rgba(219, 192, 132, 0.5)',
                transform: 'rotateY(180deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid rgba(219, 192, 132, 0.6)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <img
                src={character.backImage}
                alt={`Pronunciation ${character.index}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
        </div>

        {/* Info and Buttons */}
        <p style={{
          color: '#dbc084',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '16px',
          textAlign: 'center',
          margin: '0 0 15px 0',
          fontWeight: '500',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
        }}>
          Baybayin Character #{character.index}
        </p>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              background: 'linear-gradient(135deg, #dbc084, #f4d799)',
              border: 'none',
              color: '#2c2c2c',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(219, 192, 132, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(219, 192, 132, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(219, 192, 132, 0.4)';
            }}
          >
            {isFlipped ? 'Show Character' : 'Show how to write'}
          </button>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(219, 192, 132, 0.5)',
              color: '#dbc084',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              fontWeight: '600',
              backdropFilter: 'blur(5px)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(219, 192, 132, 0.2)';
              e.currentTarget.style.borderColor = '#dbc084';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(219, 192, 132, 0.5)';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;