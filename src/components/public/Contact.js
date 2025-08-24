import React from "react";
import { motion } from "framer-motion";
import "../styles/contact.css";

function Contact() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="contact-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(12,19,34,0.85), rgba(12,19,34,0.85)), url(/images/contact-bg.jpg)`
        }}
      >
        <div className="contact-animated-bg">
          <motion.div className="blob blob1" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} />
          <motion.div className="blob blob2" animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 12, repeat: Infinity }} />

          <motion.span className="circle circle1" animate={{ y: [-10, 10, -10] }} transition={{ duration: 8, repeat: Infinity }} />
          <motion.span className="circle circle2" animate={{ y: [10, -10, 10] }} transition={{ duration: 8, repeat: Infinity }} />
        </div>

        <motion.div className="contact-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1>Contact <span>Heritage Investment</span></h1>
          <p>Have questions? Get in touch and we’ll help you get started.</p>
        </motion.div>
      </section>

      {/* CONTACT FORM & INFO */}
      <section className="contact-section">
        <div className="contact-info">
          <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
            <i className="fas fa-map-marker-alt"></i>
            <h4>Our Address</h4>
            <p>123 Wall Street, NY, USA</p>
          </motion.div>
          <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
            <i className="fas fa-phone-alt"></i>
            <h4>Call Us</h4>
            <p>+1 762 405 7926</p>
          </motion.div>
          <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
            <i className="fas fa-envelope"></i>
            <h4>Email</h4>
            <p>support@heritageinvestmentgp.com</p>
          </motion.div>
        </div>

        <form className="contact-form">
          <h2>Send Us a Message</h2>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Email Address" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" className="primary-btn">Send Message</button>
        </form>
      </section>

      {/* OPTIONAL MAP */}
      <section className="map-section">
        <iframe
          title="Elon Musk Investment Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.886820555136!2d-74.01036228459542!3d40.70601597933156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a178af65d29%3A0x3e3a88b5dd0b2d07!2sWall%20St%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1614130686751!5m2!1sen!2sus"
          loading="lazy"
        ></iframe>
      </section>

      <footer className="footer">
        <p>© 2025 H Investment. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Contact;
