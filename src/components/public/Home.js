// src/components/Home.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import ActivityFeed from "./ActivityFeed";
import "../styles/home.css";

function Home() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,litecoin,ripple&order=market_cap_desc&per_page=5&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((err) => console.error("Error fetching market data:", err));
  }, []);

  return (
    <>
      {/* === NEWSFEED === */}
      <ActivityFeed />

      {/* === HERO SECTION === */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-container">
          {/* Text */}
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>
              Grow Your Wealth with <span>Heritage Investment</span>
            </h1>
            <p>
              Secure investments. Sustainable profits. Start building your
              financial future today with expert-backed strategies.
            </p>

            <div className="hero-buttons">
              {/* 🔹 Plain button, no navigation */}
              <button className="btn btn-primary">Get Started</button>
              <a href="#trust" className="btn btn-outline">
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            className="hero-illustration"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img src="/images/invest.jpg" alt="Investment Growth" />
          </motion.div>
        </div>
      </section>

      {/* === LIVE MARKET SECTION === */}
      <section className="market-prices">
        <h2>Live Market Prices</h2>
        <div className="market-grid">
          {coins.length > 0 ? (
            coins.map((coin) => (
              <motion.div
                className="market-card"
                key={coin.id}
                whileHover={{ scale: 1.05 }}
              >
                <div className="market-header">
                  <img src={coin.image} alt={coin.name} />
                  <h3>{coin.name}</h3>
                </div>
                <div className="price">
                  <p>${coin.current_price.toLocaleString()}</p>
                  <span
                    className={
                      coin.price_change_percentage_24h > 0 ? "up" : "down"
                    }
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <p>Loading market data...</p>
          )}
        </div>
      </section>

      {/* === TRUST SECTION === */}
      <section id="trust" className="trust-section">
        <div className="trust-header">
          <h2>Trusted by Investors Worldwide</h2>
          <p>
            Heritage Investment empowers <strong>5,000+</strong> investors in{" "}
            <strong>120+ countries</strong> with security, transparency, and
            consistent growth.
          </p>
        </div>

        <div className="trust-grid">
          <motion.div className="trust-card" whileHover={{ scale: 1.05 }}>
            <img src="/images/security.jpeg" alt="Security" />
            <h3>Bank-Grade Security</h3>
            <p>
              Multi-layered protection, insurance coverage, and compliance with
              international financial standards.
            </p>
          </motion.div>

          <motion.div className="trust-card" whileHover={{ scale: 1.05 }}>
            <img src="/images/returns.png" alt="Returns" />
            <h3>Consistent Growth</h3>
            <p>
              Proven investment strategies designed for steady long-term
              profitability.
            </p>
          </motion.div>

          <motion.div className="trust-card" whileHover={{ scale: 1.05 }}>
            <img src="/images/team.png" alt="Expert Team" />
            <h3>Expert Guidance</h3>
            <p>
              A global team of financial analysts and advisors guiding every
              decision.
            </p>
          </motion.div>

          <motion.div className="trust-card" whileHover={{ scale: 1.05 }}>
            <img src="/images/global.png" alt="Global Reach" />
            <h3>Global Reach</h3>
            <p>
              Serving investors across 120+ countries with localized insights
              and support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === STATS === */}
      <section className="stats">
        <div className="stat">
          <h2>
            <CountUp end={5000} duration={3} />+
          </h2>
          <p>Active Investors</p>
        </div>
        <div className="stat">
          <h2>
            $<CountUp end={2000000} duration={3} />
          </h2>
          <p>Total Investments</p>
        </div>
        <div className="stat">
          <h2>
            <CountUp end={120} duration={3} />+
          </h2>
          <p>Countries</p>
        </div>
      </section>

      {/* === CALL TO ACTION === */}
      <section className="cta">
        <motion.div
          className="cta-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2>Start Growing Your Wealth Today</h2>
          <p>
            Join thousands of investors who trust Heritage Investment for their
            financial success.
          </p>
          {/* Keep this one as a link to signup */}
          <a href="/signup" className="btn btn-primary">
            Create Your Account
          </a>
        </motion.div>
      </section>

      {/* === FLOATING CHAT BUTTONS === */}
      <div className="chat-buttons">
        <a
          href="https://wa.me/12105171278"
          target="_blank"
          rel="noopener noreferrer"
          className="chat-btn whatsapp"
          aria-label="WhatsApp"
        >
          <img src="/images/WhatsApp.svg" alt="WhatsApp" />
        </a>

        <a
          href="https://t.me/Markchen23"
          target="_blank"
          rel="noopener noreferrer"
          className="chat-btn telegram"
          aria-label="Telegram"
        >
          <img src="/images/Telegram_logo.svg" alt="Telegram" />
        </a>
      </div>

      {/* === FOOTER === */}
      <footer className="footer">
        <p>© 2020 Heritage Investment Group. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Home;
