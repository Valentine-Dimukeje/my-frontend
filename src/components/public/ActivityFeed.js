import React from "react";
import "../styles/activityFeed.css";

const feedData = [
  "Walter invested $2,500",
  "Rom invested $1,000",
  "Keane cashed out $5,000",
  "Rice cashed out $2,900",
  "George withdrew $5,000",
  "Amily invested $700",
  "Olivia earned $11,200",
  "Vic withdrew $6,400",
  "Jammy invested $2,700",
  "Joe invested $1,000",
  "Calvin cashed out $5,900",
  "Ken cashed out $7,500",
  "Sara withdrew $5,300",
  "Alice invested $5,500",
  "Olix earned $10,500",
  "Vin withdrew $3,000",
  "Biden invested $4,000",
  "Kuca invested $10,000",
  "Scout cashed out $1,500,000",
  "Max cashed out $10,000",
  "Gina withdrew $5,000",
  "Afred invested $1,000",
  "Redmond earned $11,200",
  "Cole withdrew $5,700",
  "Joao invested $2,000",
  "Emily invested $1,500",
  "Luren cashed out $5,000",
  "Oshola cashed out $20,000",
  "Mattie withdrew $5,000",
  "Lisa invested $5,000",
  "Lara earned $10,500",
  "Alexia withdrew $13,000",
];

function ActivityFeed() {
  return (
    <div className="ticker-container">
      <div className="ticker-wrapper">
        <div className="ticker">
          {feedData.map((item, index) => (
            <span className="ticker-item" key={index}>
              📢 {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActivityFeed;
