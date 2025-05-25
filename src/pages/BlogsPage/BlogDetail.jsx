import React, { useState } from "react";
import "./BlogDetail.css"; // Import the new CSS file
import Header from "../../components/Header"; // Import Header component
import Footer from "../../components/Footer";
import ctaLeaf from "./assets/img/cta-leaf.png";

// Sample blog data - in real app, this would come from props or API
const blogData = {
  title: "Introducing modules: reusable workflows for your entire team",
  date: "March 21, 2025",
  content: [
    {
      type: "text",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet erat ultricies, pulvinar lacus at, ullamcorper dolor. Nullam efficitur imperdiet velit. Etiam id pellentesque lorem, quis aliquam elit. Aliquam erat volutpat. Etiam tellus felis, facilisis rutrum dapibus eget, fringilla vitae sem. Nulla elementum id tellus sed posuere. Proin metus magna, maximus vitae congue a, viverra sit amet nulla. Curabitur ac varius massa. Suspendisse potenti.",
    },
  ],
  tableOfContents: [
    "Lorem ipsum dolor",
    "Lorem ipsum dolor sit",
    "Lorem ipsum dolor sit amet",
  ],
  relatedPosts: [
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipi.",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet erat ultricies.",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipi.",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet erat ultricies.",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipi.",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet erat ultricies.",
    },
  ],
};

const latestBlogs = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    date: "March 21, 2025",
    title:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or",
    excerpt:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or clear guidance on a challenge...",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    date: "March 21, 2025",
    title:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or",
    excerpt:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or clear guidance on a challenge...",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
    date: "March 21, 2025",
    title:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or",
    excerpt:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or clear guidance on a challenge...",
  },
];

const podcasts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop",
    date: "March 21, 2025",
    title:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or",
    excerpt:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or clear guidance on a challenge —",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=300&fit=crop",
    date: "March 21, 2025",
    title:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or",
    excerpt:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or clear guidance on a challenge —",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    date: "March 21, 2025",
    title:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or",
    excerpt:
      "Whether you're looking for 1-on-1 support, a reflective AI space, or clear guidance on a challenge —",
  },
];

const BlogDetail = () => {
  return (
    <div className="blog-detail-page">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div>
        {/* Blog Header */}
        <section>
          <div className="bd-header-title">
            <a href="#" className="bd-back-link">
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
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back To All Blogs
            </a>
            <h1
              className="bd-blog-title"
              style={{
                margin: "auto",
                maxWidth: "800px",
                textAlign: "center",
                color: "#93252a",
                fontSize: "4.8rem",
                marginBottom: "20px",
                fontWeight: "600",
              }}
            >
              {blogData.title}
            </h1>
          </div>

          {/* Blog Layout */}
          <div className="bd-layout">
            {/* Table of Contents */}
            <aside className="bd-contents">
              <h3>Contents</h3>
              <ol>
                {blogData.tableOfContents.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </aside>

            {/* Main Content */}
            <main className="bd-main-content">
              <div className="bd-post-date">{blogData.date}</div>

              <div className="bd-image-container">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
                  alt="Decorative floral artwork"
                  className="bd-feature-image"
                />
              </div>

              <div className="bd-content">
                <h2>Lorem ipsum dolor</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  sit amet erat ultricies, pulvinar lacus at, ullamcorper dolor.
                  Nullam efficitur imperdiet velit. Etiam id pellentesque lorem,
                  quis aliquam elit. Aliquam erat volutpat. Etiam tellus felis,
                  facilisis rutrum dapibus eget, fringilla vitae sem. Nulla
                  elementum id tellus sed posuere. Proin metus magna, maximus
                  vitae congue a, viverra sit amet nulla. Curabitur ac varius
                  massa. Suspendisse potenti.
                </p>

                <p>
                  Duis ut augue sit amet turpis luctus bibendum. Sed non nibh
                  venenatis tellus iaculis ultricies id ut nibh. Quisque
                  malesuada, diam ut hendrerit lobortis, elit enim convallis
                  dolor, a condimentum ante enim a lacus. In vitae facilisis
                  felis. Fusce elementum dui cursus gravida feugiat. Donec
                  porttitor luctus magna et sagittis. Fusce volutpat vitae diam
                  sit amet auctor.
                </p>

                <h2>Lorem ipsum dolor sit</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  sit amet erat ultricies, pulvinar lacus at, ullamcorper dolor.
                  Nullam efficitur imperdiet velit. Etiam id pellentesque lorem,
                  quis aliquam elit. Aliquam erat volutpat.
                </p>

                <div className="bd-image-container">
                  <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop"
                    alt="Minimalist architecture"
                    className="bd-feature-image"
                  />
                </div>

                <h2>Lorem ipsum dolor sit amet</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  sit amet erat ultricies, pulvinar lacus at, ullamcorper dolor.
                  Nullam efficitur imperdiet velit. Etiam id pellentesque lorem,
                  quis aliquam elit. Aliquam erat volutpat.
                </p>
              </div>
            </main>

            {/* Related Reading */}
            <aside className="bd-related-reading">
              <h3>Related reading</h3>
              {blogData.relatedPosts.map((post, index) => (
                <div key={index} className="bd-related-post">
                  <h4>{post.title}</h4>
                  <p>{post.excerpt}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* Latest Blogs Section */}
        <section className="bd-blogs-section bd-section-margin-top">
          <div className="bd-blogs-intro-container">
            <h2 className="bd-section-heading">
              <img
                src={ctaLeaf}
                alt="Logo Icon"
                className="bd-icon-height-30"
              />
              Latest on Our Blogs
            </h2>
            <p className="bd-blogs-intro">
              Whether you're looking for 1-on-1 support, a reflective AI space,
              or clear guidance on a challenge – Inner Embrace offers a path
              that meets you where you are.
            </p>
          </div>

          <div className="bd-blog-cards">
            {latestBlogs.map((blog) => (
              <div key={blog.id} className="bd-blog-card">
                <div
                  className="bd-blog-image"
                  style={{ backgroundImage: `url('${blog.image}')` }}
                ></div>
                <div className="bd-blog-content">
                  <div className="bd-blog-date">{blog.date}</div>
                  <span>{blog.title}</span>
                  <p>{blog.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Podcasts Section */}
        <div className="bd-podcasts-container">
          <div className="bd-podcasts-header">
            <div>
              <h2 className="bd-section-heading bd-podcasts-title">
                <img
                  src={ctaLeaf}
                  alt="Logo Icon"
                  className="bd-podcasts-icon"
                />
                Another Podcasts
              </h2>
            </div>
            <a href="#" className="bd-browse-all-link">
              <span className="bd-browse-all-text">
                Browse All Trending Podcasts
              </span>
              <span className="bd-browse-all-arrow">→</span>
            </a>
          </div>

          <div className="bd-blog-cards">
            {podcasts.map((podcast) => (
              <div key={podcast.id} className="bd-blog-card">
                <img
                  src={podcast.image}
                  alt="Podcast thumbnail"
                  className="bd-blog-image"
                  style={{ width: "100%", height: "279px", objectFit: "cover" }}
                />
                <div className="bd-podcast-content">
                  <p className="bd-podcast-date">{podcast.date}</p>
                  <h3 className="bd-podcast-title">{podcast.title}</h3>
                  <p className="bd-podcast-excerpt">{podcast.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <section className="bd-newsletter-container">
          <div className="bd-newsletter">
            <h2>
              <img
                src={ctaLeaf}
                alt="Logo Icon"
                className="bd-icon-height-30"
              />
              Slogan Inner Embrace
            </h2>
            <p>
              Whether you're looking for 1-on-1 support, a reflective AI space,
              or clear guidance on a challenge – Inner Embrace offers a path
              that meets you where you are.
            </p>
            <a href="#" className="bd-newsletter-btn">
              Try AI Coaching for Free
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;
