import React from "react";
import "./ChatButtons.css";

function ChatButtons() {
  return (
    <div className="chat-buttons">
      {/* WhatsApp */}
       <a
          href="https://wa.me/12105171278"
          target="_blank"
          rel="noopener noreferrer"
          className="chat-btn whatsapp"
          aria-label="WhatsApp"
        >
          <img src="/images/Whatsapp.svg" alt="WhatsApp" />
        </a>


      {/* Telegram */}
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
  );
}

export default ChatButtons;
