import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function CreateAllDice({ dice, clickDice }) {
  const diceElements = dice.map((die) => (
    <Die
      key={nanoid()}
      dieID={nanoid()}
      value={die.value}
      isActive={die.isActive}
      isClicked={() => clickDice(die.id)}
    />
  ));

  return diceElements;
}
