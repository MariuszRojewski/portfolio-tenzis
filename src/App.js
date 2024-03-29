import React from "react";
import { nanoid } from "nanoid";
import "./global.css";
// Komponenty
import Confetti from "react-confetti";
import SortDice from "./components/SortDice";
import CreateAllDice from "./components/CreateAllDice";

function App() {
  const [dice, setDice] = React.useState(createDices());
  const [win, setWin] = React.useState(false);
  const [rolls, setRolls] = React.useState(1);
  const [totalWins, setTotalWins] = React.useState(0);

  const [theBestScore, setTheBestScore] = React.useState(
    JSON.parse(localStorage.getItem("theBestScore")) || []
  );

  React.useEffect(() => {
    const fistNumber = dice[0].value;
    const checkActiveStatus = dice.every((die) => die.isActive);
    const checkNumberStatus = dice.every((die) => die.value === fistNumber);

    if (checkActiveStatus && checkNumberStatus) {
      setWin(true);
      setTotalWins((oldTotalWins) => oldTotalWins + 1);
    }
  }, [dice]);

  React.useEffect(() => {
    localStorage.setItem("theBestScore", JSON.stringify(theBestScore));
  }, [theBestScore]);

  function createDices() {
    const dice = [];
    for (let i = 1; i <= 10; i++) {
      const randomNumber = Math.ceil(Math.random() * 6);
      const die = {
        value: randomNumber,
        isActive: false,
        id: nanoid(),
      };

      dice.push(die);
    }

    return dice;
  }

  function rollDice() {
    if (win) {
      setDice(createDices());
      setRolls(0);
      setWin(false);
      setTheBestScore((prevItems) => [...prevItems, rolls]);
    }

    setRolls((oldDiceNumber) => oldDiceNumber + 1);

    setDice((oldDice) => {
      const mappedArray = oldDice.map((die) =>
        die.isActive
          ? { ...die }
          : {
              value: Math.ceil(Math.random() * 6),
              isActive: false,
              id: nanoid(),
            }
      );

      return mappedArray;
    });
  }

  function clickDice(id) {
    setDice((oldDice) => {
      const mappedArray = oldDice.map((die) =>
        die.id === id
          ? {
              ...die,
              isActive: !die.isActive,
            }
          : {
              ...die,
            }
      );

      return mappedArray;
    });
  }

  return (
    <main>
      <h1 className="dice-header">Tenzis</h1>
      <p className="dice-info">
        Aby ukończyć zgrę, musisz zaznaczyć wszystkie numery o tej samerj
        wartości.
      </p>
      {win && <Confetti />}
      {win && <p className="win">WYGRAŁEŚ</p>}
      <div className="dice-container">
        <CreateAllDice dice={dice} clickDice={clickDice} />
      </div>
      <div>
        <span>ROLLS: {rolls}</span>/<span>TOTAL WINS: {totalWins}</span>
      </div>
      <div className="score">
        The best score:
        <ul>
          <SortDice theBestScore={theBestScore} />
        </ul>
      </div>
      <button className="dice-roll" onClick={rollDice}>
        {win ? "Start New Game" : "Roll Dice"}
      </button>
    </main>
  );
}

export default App;
