import { motion } from "framer-motion";
import "../styles/GlobalLoader.css"; // styles for loader

export default function GlobalLoader({ show }) {
  if (!show) return null;

  return (
    <motion.div
      className="global-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="spinner"></div>
    </motion.div>
  );
}
