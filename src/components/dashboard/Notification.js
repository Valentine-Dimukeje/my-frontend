// src/components/common/Notification.js
import React, { useEffect } from "react";
import "../styles/Notification.css";

const Notification = ({ type = "info", message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // auto-close after 4s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">&times;</button>
    </div>
  );
};

export default Notification;
