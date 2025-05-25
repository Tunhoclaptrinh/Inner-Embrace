import React, { useState } from "react";
import "./BlogsPage.css"; // Import CSS file
import Header from "../../components/Header"; // Import Header component
import Footer from "../../components/Footer";
// Import images
import ctaLeaf from "./assets/img/cta-leaf.png";
import heroImage from "./assets/img/image1.jpg";
import blog1 from "./assets/img/blog1.png";
import blog2 from "./assets/img/blog2.png";
import blog3 from "./assets/img/blog3.png";

const BlogsPage = () => {
  const [activeTab, setActiveTab] = useState("All Blogs");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = ["All Blogs", "01", "02", "03", "04", "05", "06", "07", "08"];

  const blogData = Array(12).fill({
    date: "March 21, 2025",
    title:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or",
    excerpt:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or clear guidance on a challenge —",
    image: blog3, // Updated to use imported image
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageClick = (page) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  return (
    <div className="blogs-page">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="bp-main-content">
        {/* Blogs Section */}
        <section className="bp-blogs-section">
          {/* Intro */}
          <div className="bp-blogs-intro-container">
            <h2 className="bp-section-heading">
              <img src={ctaLeaf} alt="Logo Icon" />
              Latest on Our Blogs
            </h2>
            <p className="bp-blogs-intro">
              Whether you're looking for 1-on-1 support, a reflective AI space,
              or clear guidance on a challenge – Inner Embrace offers a path
              that meets you where you are.
            </p>
          </div>

          {/* Hero Section */}
          <section className="bp-hero">
            <div className="bp-hero-content-container">
              <div className="bp-hero-content">
                <h1>We don't just connect devices — we connect lives.</h1>
                <p>Ready? Get in touch with your inner world now...</p>
              </div>
            </div>
            <div className="bp-hero-gradient-overlay"></div>
            <div
              className="bp-hero-image"
              style={{ backgroundImage: `url(${heroImage})` }}
            ></div>
          </section>

          {/* Featured Blog Cards */}
          <div className="bp-featured-blog-cards">
            {[
              { img: blog1, id: 1 },
              { img: blog2, id: 2 },
              { img: blog3, id: 3 },
            ].map(({ img, id }) => (
              <div key={id} className="bp-featured-blog-card">
                <div
                  className="bp-featured-blog-image"
                  style={{ backgroundImage: `url(${img})` }}
                />
                <div className="bp-featured-blog-content">
                  <div className="bp-featured-blog-date">March 21, 2025</div>
                  <span>
                    Whether you're looking for 1-on-1 support, a reflective AI
                    space, or
                  </span>
                  <p>
                    Whether you're looking for 1-on-1 support, a reflective AI
                    space, or clear guidance on a challenge...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Container */}
        <div className="bp-blog-container">
          {/* Blog Header */}
          <div className="bp-blog-header">
            <img
              src={ctaLeaf}
              alt="Logo Icon"
              style={{
                display: "block",
                width: "23px",
                height: "fit-content",
                marginRight: "10px",
                position: "absolute",
                left: "0",
                transform: "translateX(-30px)",
              }}
            />
            <h2 className="bp-section-heading">Our Blog</h2>
          </div>

          <p className="bp-blog-description">
            Whether you're looking for 1-on-1 support, a reflective AI space, or
            clear guidance on a challenge — Inner Embrace offers a path that
            meets you where you are.
          </p>

          {/* Tabs and Search */}
          <div className="bp-tabs-and-search">
            <div className="bp-filter-tabs">
              {tabs.map((tab) => (
                <div
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`bp-tab ${activeTab === tab ? "active" : ""}`}
                >
                  {tab}
                </div>
              ))}
            </div>

            <div className="bp-search-container">
              <span className="bp-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Blog Grid */}
          <div className="bp-blog-grid">
            {blogData.map((blog, index) => (
              <div key={index} className="bp-blog-card">
                <img
                  src={blog.image}
                  alt="Blog thumbnail"
                  className="bp-blog-image"
                />
                <div className="bp-blog-card-content">
                  <p className="bp-blog-date">{blog.date}</p>
                  <h3 className="bp-blog-title">{blog.title}</h3>
                  <p className="bp-blog-excerpt">{blog.excerpt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="bp-pagination">
            {[1, 2, 3, "···", 25].map((page, index) => (
              <div
                key={index}
                onClick={() => handlePageClick(page)}
                className={`bp-page-item ${
                  currentPage === page ? "active" : ""
                } ${page === "···" ? "ellipsis" : ""}`}
              >
                {page}
              </div>
            ))}
            <div className="bp-page-item next">›</div>
          </div>
        </div>

        {/* Newsletter Section */}
        <section className="bp-newsletter-container">
          <div className="bp-newsletter-blog">
            <h2 className="bp-section-heading">
              <img src={ctaLeaf} alt="Logo Icon" />
              Slogan Inner Embrace
            </h2>
            <p>
              Whether you're looking for 1-on-1 support, a reflective AI space,
              or clear guidance on a challenge – Inner Embrace offers a path
              that meets you where you are.
            </p>
            <a href="#" className="bp-newsletter-btn">
              Try AI Coaching for Free
            </a>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default BlogsPage;
