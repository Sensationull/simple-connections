import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GameContainer from "./game/GameContainer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="container">
      <GameContainer />
    </main>
  </StrictMode>,
);
