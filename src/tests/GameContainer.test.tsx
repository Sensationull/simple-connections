import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import GameContainer from "../game/GameContainer";

describe("GameContainer component", () => {
  it("should render", () => {
    render(<GameContainer />);
    screen.debug();
  });
});
