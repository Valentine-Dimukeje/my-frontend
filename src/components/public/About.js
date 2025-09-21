import React from "react";
import { motion } from "framer-motion";
import "../styles/about.css";

function About() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="about-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(12,19,34,0.8), rgba(12,19,34,0.8)), url(/images/team-bg.jpg)`
        }}
      >
        {/* Floating background elements */}
        <div className="about-animated-bg">
          <motion.div className="blob blob1" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} />
          <motion.div className="blob blob2" animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 12, repeat: Infinity }} />

          <motion.span className="circle circle1" animate={{ y: [-10, 10, -10] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.span className="circle circle2" animate={{ y: [10, -10, 10] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        </div>

        <motion.div className="about-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1>About <span>Heritage Investment</span></h1>
          <p>Empowering investors worldwide with secure and profitable trading strategies.</p>
        </motion.div>
      </section>

      {/* OUR MISSION SECTION */}
      <section className="about-mission">
        <motion.div
          className="mission-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Our Mission</h2>
          <p>
            At Heritage Investment, we are dedicated to providing investors with secure, data-driven 
            investment strategies. Our platform leverages cutting-edge technologies to 
            maximize profits while minimizing risks.
          </p>
        </motion.div>
        <motion.img
          src="/images/moni.jpg"
          alt="Mission"
          className="mission-img"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </section>

      {/* TEAM SECTION */}
      <section className="about-team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {[
            { name: "Sarah Johnson", role: "CEO", img: "/images/sara.jpeg" },
            { name: "Mark Chen", role: "Lead Developer", img: "/images/mark.jpg" },
            { name: "Emily Brown", role: "Data Analyst", img: "/images/emily.jpg" }
          ].map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={member.img} alt={member.name} />
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="about-cta">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2>Ready to grow your investments?</h2>
          <button className="primary-btn">Join Now</button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2020 Heritage Investment Group. All rights reserved.</p>
      </footer>
    </>
  );
}

export default About;
