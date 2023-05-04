import React from "react";
import "../global.css";

export default function SortDice({ theBestScore }) {
  function compareNumbers(a, b) {
    return a - b;
  }
  const sortBestScore = theBestScore.sort(compareNumbers);
  const bestScore = sortBestScore.map((score, index) => (
    <li key={index}>{score} rolls</li>
  ));

  return bestScore ? bestScore : null;
}
