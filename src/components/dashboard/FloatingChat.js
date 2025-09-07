// src/components/FloatingChat.js
import React from "react";
import "../styles/FloatingChat.css";

const FloatingChat = () => {
  return (
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
        href="https://t.me/Markchen23"
        target="_blank"
        rel="noopener noreferrer"
        className="chat-btn telegram"
      >
        <img src="/images/Telegram_logo.svg" alt="Telegram" />
      </a>
    </div>
  );
};

export default FloatingChat;
