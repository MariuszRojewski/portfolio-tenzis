import React from "react";

export default function Die({ value, isActive, isClicked }) {
  return (
    <div
      className={`die-face ${isActive ? "isAtice" : ""}`}
      onClick={isClicked}
    >
      {value}
    </div>
  );
}
