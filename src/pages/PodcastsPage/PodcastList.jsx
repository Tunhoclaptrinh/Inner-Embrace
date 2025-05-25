import React, { useState } from "react";
import "./PodcastList.css"; // Import the new scoped CSS file
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import ctaLeaf from "./assets/img/cta-leaf.png";
import podcast1 from "./assets/img/pod1.png";
import podcast2 from "./assets/img/pod2.png";
import podcast3 from "./assets/img/pod3.png";
import podcast4 from "./assets/img/pod4.png";

const PodcastList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Generate podcast data array
  const podcastData = Array(16)
    .fill()
    .map((_, index) => ({
      id: index + 1,
      title: "Whether you're looking for 1-on-1 support",
      host: index % 2 === 0 ? "Alessandro Conti" : "ZukiPasa",
      image: [podcast1, podcast2, podcast3, podcast4][index % 4],
    }));

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter podcasts based on search term
  const filteredPodcasts = podcastData.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.host.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="podcast-list">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="podcast-list__main-content">
        <section className="podcast-list__section">
          {/* Top Navigation and Search */}
          <div className="podcast-list__top-navigation">
            <Link to="/podcasts" className="podcast-list__back-link">
              Back To All Podcasts
            </Link>
            {/* Header Section */}
            <div className="podcast-list__header-container">
              <h2 className="podcast-list__section-heading">
                <img src={ctaLeaf} alt="Logo Icon" />
                Trending Podcasts
              </h2>
            </div>
            <div className="podcast-list__search-container">
              <span className="podcast-list__search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search podcasts..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="podcast-list__search-input"
              />
            </div>
          </div>

          {/* Podcast Grid */}
          <div className="podcast-list__grid-container">
            <div className="podcast-list__podcast-grid">
              {filteredPodcasts.length > 0 ? (
                filteredPodcasts.map((podcast) => (
                  <div key={podcast.id} className="podcast-list__podcast-card">
                    <div
                      className="podcast-list__podcast-image"
                      style={{ backgroundImage: `url(${podcast.image})` }}
                    >
                      <div className="podcast-list__inner-embrace-tag">
                        Inner Embrace
                      </div>
                      <button
                        className="podcast-list__play-button"
                        onClick={() =>
                          console.log(`Playing podcast ${podcast.id}`)
                        }
                        aria-label={`Play ${podcast.title}`}
                      >
                        <i className="fas fa-play"></i>
                      </button>
                    </div>
                    <div className="podcast-list__podcast-info">
                      <p className="podcast-list__podcast-description">
                        {podcast.title}
                      </p>
                      <p className="podcast-list__podcast-host">
                        {podcast.host}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="podcast-list__no-results">
                  <p>No podcasts found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="podcast-list__newsletter-container">
          <div className="podcast-list__newsletter">
            <h2 className="podcast-list__section-heading">
              <img src={ctaLeaf} alt="Logo Icon" />
              Slogan Inner Embrace
            </h2>
            <p className="podcast-list__newsletter-text">
              Whether you're looking for 1-on-1 support, a reflective AI space,
              or clear guidance on a challenge – Inner Embrace offers a path
              that meets you where you are.
            </p>
            <a
              href="#"
              className="podcast-list__newsletter-btn"
              onClick={(e) => {
                e.preventDefault();
                console.log("Newsletter button clicked");
              }}
            >
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

export default PodcastList;
