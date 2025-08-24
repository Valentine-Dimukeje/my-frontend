import React from "react";
import "./ChatButtons.css";

function ChatButtons() {
  return (
    <div className="chat-buttons">
      {/* WhatsApp */}
      <a
        href="https://wa.me/2348012345678" // Change number to yours
        target="_blank"
        rel="noopener noreferrer"
        className="chat-btn whatsapp"
      >
        <img src="/images/whatsapp.png" alt="WhatsApp" />
      </a>

      {/* Telegram */}
      <a
        href="https://t.me/YourTelegramUsername" // Change username to yours
        target="_blank"
        rel="noopener noreferrer"
        className="chat-btn telegram"
      >
        <img src="/images/telegram.png" alt="Telegram" />
      </a>
    </div>
  );
}

export default ChatButtons;
