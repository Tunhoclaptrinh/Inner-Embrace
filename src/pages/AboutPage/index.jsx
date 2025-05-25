import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./AboutPage.css"; // Import the CSS file for styling
import heroImage from "./assets/img/image2.jpg"; // Import the hero image
import logoStory from "./assets/img/logo-story.png"; // Import the logo image
import ctaLeaf from "./assets/img/cta-leaf.png"; // Import the leaf image

function AboutPage() {
  return (
    <>
      <Header />
      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content-container"></div>
          <div
            className="about-hero-image"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
        </section>

        {/* Story Section */}
        <section className="about-connection-and-story">
          <div className="about-connection-and-story-container">
            <div className="about-story">
              <h2 className="about-story-heading">
                <img
                  className="about-logo-story"
                  src={logoStory}
                  alt="Logo Icon"
                />
                <span className="about-logo-story-text">Story</span>
              </h2>
              <div className="about-story-paragraph">
                <p className="about-story-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  egestas arcu ultricies, pulvinar lacus at, ullamcorper dolor.
                  Nullam efficitur imperdiet velit. Etiam id pellentesque lorem.
                  Aliquam erat volutpat. Etiam tellus felis, facilisis maximus
                  dapibus ligula imperdiet malesuada feugiat. Nullp egesta ea
                  tellus sed posuere. Morbi metus magna, maximus vitae congue a,
                  viverra sit amet nulla. Curabitur arcu massa, finibus in
                  metus.
                </p>
                <p className="about-story-text">
                  Duis at magna sit amet turpis luctus bibendum. Sed non nibh
                  venenatis tellus lacinia ultrices et at nisl. Quisque
                  malesuada, dolor et hendrerit luctus, elit sem convallis
                  dolor, a condimentum ante ante a lacus. In vitae facilisis
                  felis. Fusce elementum dui cursus gravida feugiat. Donec
                  porttitor luctus metus et sagittis. Fusce volutpat vitae dolor
                  sit amet varius.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter/CTA Section */}
        <section className="about-newsletter-container">
          <div className="about-newsletter">
            <h2 className="about-newsletter-heading">
              <img src={ctaLeaf} alt="Logo Icon" className="about-cta-leaf" />
              Slogan Inner Embrace
            </h2>
            <p className="about-newsletter-text">
              Whether you're looking for 1-on-1 support, a reflective AI space,
              or clear guidance on a challenge – Inner Embrace offers a path
              that meets you where you are.
            </p>
            <a
              href="#"
              className="about-newsletter-btn about-btn about-btn-primary"
            >
              Try AI Coaching for Free
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
