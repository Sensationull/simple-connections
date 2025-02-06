import "./App.css";

function GameContainer() {
  const handleClick = (event: React.BaseSyntheticEvent) => {
    console.log({ target: event.target.value });
  };
  return (
    <>
      <main>
        <button onClick={handleClick}>Some more things</button>
      </main>
    </>
  );
}

export default GameContainer;
