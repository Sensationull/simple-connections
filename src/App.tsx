import "./App.css";

function App() {
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

export default App;
