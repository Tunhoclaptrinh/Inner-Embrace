import React, { useState } from "react";
import "./PodcastsPage.css"; // Import the new scoped CSS file
import Header from "../../components/Header"; // Reusing Header component
import Footer from "../../components/Footer"; // Reusing Footer component
import { Link } from "react-router-dom"; // For navigation
// Import images
import ctaLeaf from "./assets/img/cta-leaf.png";
import podcast1 from "./assets/img/pod1.png";
import podcast2 from "./assets/img/pod2.png";
import podcast3 from "./assets/img/pod3.png";
import podcast4 from "./assets/img/pod4.png";

const PodcastsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const podcastCategories = [
    "Trending Podcasts",
    "Relax Podcasts",
    "Education Podcasts",
    "Business & Technology Podcasts",
    "Lifestyle & Health Podcasts",
    "Arts & Entertainment Podcasts",
    "Chill vibes for Friday morning",
  ];

  const podcastData = [
    {
      id: 1,
      title: "Whether you're looking for 1-on-1 support",
      host: "Alessandro Conti",
      image: podcast1,
    },
    {
      id: 2,
      title: "Whether you're looking for 1-on-1 support",
      host: "ZukiPasa",
      image: podcast2,
    },
    {
      id: 3,
      title: "Whether you're looking for 1-on-1 support",
      host: "ZukiPasa",
      image: podcast3,
    },
    {
      id: 4,
      title: "Whether you're looking for 1-on-1 support",
      host: "Alessandro Conti",
      image: podcast4,
    },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="podcasts-page">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="podcasts-page__main-content">
        {/* Podcasts Section */}
        <section className="podcasts-page__section">
          <div className="podcasts-page__intro-container">
            <h2 className="podcasts-page__section-heading">
              <img src={ctaLeaf} alt="Logo Icon" />
              Podcasts
            </h2>
            <p className="podcasts-page__intro-text">
              Unlock the World of Artificial Intelligence through Podcasts
            </p>
            <p className="podcasts-page__intro-text">
              Dive deep into the AI universe with our collection of insightful
              podcasts. Let's explore together.
            </p>
          </div>

          {/* Hero Section with Search */}
          <div className="podcasts-page__hero">
            <h2 className="podcasts-page__hero-title">
              Unlock the World of Artificial Intelligence through Podcasts
            </h2>
            <p className="podcasts-page__hero-description">
              Dive deep into the AI universe with our collection of insightful
              podcasts. Let's explore together.
            </p>

            <div className="podcasts-page__search-container">
              <div className="podcasts-page__search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="podcasts-page__search-input"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Featured Podcast Card */}
          <div className="podcasts-page__featured-cards">
            <div className="podcasts-page__featured-card">
              <div
                className="podcasts-page__featured-image"
                style={{ backgroundImage: `url(${podcast1})` }}
              >
                <div className="podcasts-page__inner-embrace-tag">
                  Inner Embrace
                </div>
                <button className="podcasts-page__play-button">
                  <i className="fas fa-play"></i>
                </button>
              </div>
              <div className="podcasts-page__featured-content">
                <h3 className="podcasts-page__featured-title">Inner Embrace</h3>
                <p className="podcasts-page__featured-description">
                  Whether you're looking for 1-on-1 support, a reflective AI
                  space, or clear guidance on a challenge — Inner Embrace offers
                  a path that meets you where you are.
                </p>
                <Link to="/podcasts/list" className="podcasts-page__read-more">
                  <span>Read More</span> →
                </Link>
              </div>
            </div>
            <div className="podcasts-page__featured-card">
              <div
                className="podcasts-page__featured-image"
                style={{ backgroundImage: `url(${podcast1})` }}
              >
                <div className="podcasts-page__inner-embrace-tag">
                  Inner Embrace
                </div>
                <button className="podcasts-page__play-button">
                  <i className="fas fa-play"></i>
                </button>
              </div>
              <div className="podcasts-page__featured-content">
                <h3 className="podcasts-page__featured-title">Inner Embrace</h3>
                <p className="podcasts-page__featured-description">
                  Whether you're looking for 1-on-1 support, a reflective AI
                  space, or clear guidance on a challenge — Inner Embrace offers
                  a path that meets you where you are.
                </p>
                <Link to="/podcasts/list" className="podcasts-page__read-more">
                  <span>Read More</span> →
                </Link>
              </div>
            </div>
          </div>

          {/* Podcast Categories */}
          {podcastCategories.map((category, index) => (
            <div key={index} className="podcasts-page__trending-section">
              <div className="podcasts-page__section-header">
                <div className="podcasts-page__section-header-container">
                  <div className="podcasts-page__section-title">
                    <h2>
                      <img src={ctaLeaf} alt="Logo Icon" />
                      {category}
                    </h2>
                  </div>
                  <p className="podcasts-page__section-description">
                    Whether you're looking for 1-on-1 support, a reflective AI
                    space, or clear guidance on a challenge — Inner Embrace
                    offers a path that meets you where you are.
                  </p>
                </div>
                <Link to="/podcasts/list" className="podcasts-page__read-more">
                  <span>Read More</span> →
                </Link>
              </div>
              <div className="podcasts-page__podcast-grid">
                {podcastData.map((podcast) => (
                  <div key={podcast.id} className="podcasts-page__podcast-card">
                    <div
                      className="podcasts-page__podcast-image"
                      style={{ backgroundImage: `url(${podcast.image})` }}
                    >
                      <div className="podcasts-page__inner-embrace-tag">
                        Inner Embrace
                      </div>
                      <button className="podcasts-page__play-button">
                        <i className="fas fa-play"></i>
                      </button>
                    </div>
                    <div className="podcasts-page__podcast-info">
                      <p className="podcasts-page__podcast-description">
                        {podcast.title}
                      </p>
                      <p className="podcasts-page__podcast-host">
                        {podcast.host}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Newsletter Section */}
        <section className="podcasts-page__newsletter-container">
          <div className="podcasts-page__newsletter">
            <h2 className="podcasts-page__section-heading">
              <img src={ctaLeaf} alt="Logo Icon" />
              Slogan Inner Embrace
            </h2>
            <p className="podcasts-page__newsletter-text">
              Whether you're looking for 1-on-1 support, a reflective AI space,
              or clear guidance on a challenge – Inner Embrace offers a path
              that meets you where you are.
            </p>
            <a href="#" className="podcasts-page__newsletter-btn">
              Try AI Coaching for Free
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PodcastsPage;
