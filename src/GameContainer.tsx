import "./GameContainer.css";
import Gameboard from "./game/Gameboard";

function GameContainer() {
  const handleClick = (event: React.BaseSyntheticEvent) => {
    console.log({ target: event.target.value });
  };
  return (
    <>
      <section className="game-container">
        <Gameboard />
        <div className="button-group">
          <button onClick={handleClick}>Give up</button>
          <button onClick={handleClick}>Reset</button>
        </div>
      </section>
    </>
  );
}

export default GameContainer;
