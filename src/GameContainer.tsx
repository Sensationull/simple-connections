import "./GameContainer.css";
import Gameboard from "./game/Gameboard";
import RemainingTries from "./game/RemainingTries";

function GameContainer() {
  const handleClick = (event: React.BaseSyntheticEvent) => {
    console.log({ target: event.target.value });
  };
  return (
    <>
      <section className="game-container">
        <Gameboard />
        <RemainingTries />
        <div className="button-group">
          <button onClick={handleClick}>Give up</button>
          <button onClick={handleClick}>Reset</button>
        </div>
      </section>
    </>
  );
}

export default GameContainer;
