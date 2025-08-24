import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Sparklines, SparklinesLine } from "react-sparklines";
import ActivityFeed from "./ActivityFeed"; // Import your news feed
import "../styles/home.css";

function Home() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch live prices
  useEffect(() => {
    let isMounted = true;

    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,litecoin,solana,ripple,dogecoin&sparkline=true"
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();

        if (isMounted) {
          setPrices(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching market prices:", error);
        if (isMounted) setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* NEWS TICKER */}
      <ActivityFeed />

      {/* HERO SECTION */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(12,19,34,0.8), rgba(12,19,34,0.8)), url(/images/EarthW.jpg)`
        }}
      >
        <div className="hero-animated-bg">
          {/* Floating blobs */}
          <motion.div
            className="blob blob1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="blob blob2"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 12, repeat: Infinity }}
          />

          {/* Floating crypto icons */}
          <motion.img
            src="/images/btc.png"
            alt="Bitcoin"
            className="crypto-icon icon1"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/images/eth.png"
            alt="Ethereum"
            className="crypto-icon icon2"
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/images/sol.webp"
            alt="Solana"
            className="crypto-icon icon3"
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/images/xrp.jpg"
            alt="XRP"
            className="crypto-icon icon4"
            animate={{ y: [15, -15, 15] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>
            Grow Your Wealth With <span>Heritage Investment</span>
          </h1>
          <p>
            Secure investments, maximum profits. Start building your future
            today with our professional trading strategies.
          </p>
          <button className="primary-btn">Get Started</button>
        </motion.div>
      </section>

      {/* MARKET PRICES SECTION */}
      <section className="market-prices">
        <h2>Live Market Prices</h2>
        <div className="market-grid">
          {loading ? (
            <p>Loading live prices...</p>
          ) : prices.length > 0 ? (
            prices.map((coin) => (
              <motion.div
                className="market-card"
                key={coin.id}
                whileHover={{ scale: 1.05 }}
              >
                <div className="market-header">
                  <img
                    src={coin.image || "/images/placeholder.png"}
                    alt={coin.name}
                  />
                  <div>
                    <h4>
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </h4>
                    <p className="price">
                      ${coin.current_price?.toLocaleString() || "N/A"}{" "}
                      <span
                        className={
                          coin.price_change_percentage_24h >= 0 ? "up" : "down"
                        }
                      >
                        {coin.price_change_percentage_24h?.toFixed(2) || "0.00"}%
                      </span>
                    </p>
                  </div>
                </div>

                {/* Sparkline */}
                <div className="sparkline-container">
                  {Array.isArray(coin.sparkline_in_7d?.price) &&
                  coin.sparkline_in_7d.price.length > 0 ? (
                    <Sparklines data={coin.sparkline_in_7d.price.slice(-24)}>
                      <SparklinesLine
                        color={
                          coin.price_change_percentage_24h >= 0
                            ? "green"
                            : "red"
                        }
                        style={{ strokeWidth: 2, fill: "none" }}
                      />
                    </Sparklines>
                  ) : (
                    <p className="no-data">No data</p>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <p>No market data available</p>
          )}
        </div>
      </section>

      {/* STATS SECTION */}
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

      {/* Floating Chat Buttons */}
      <div className="chat-buttons">
        <a
          href="https://wa.me/17624057926"
          target="_blank"
          rel="noopener noreferrer"
          className="chat-btn whatsapp"
        >
          <img src="/images/Whatsapp.svg" alt="WhatsApp" />
        </a>

        <a
          href="https://t.me/Mark_Chen5"
          target="_blank"
          rel="noopener noreferrer"
          className="chat-btn telegram"
        >
          <img src="/images/Telegram_logo.svg" alt="Telegram" />
        </a>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Heritage Investment. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Home;
