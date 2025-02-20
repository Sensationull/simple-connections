import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeAll, vi } from "vitest";
import GameContainer from "../game/GameContainer";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const createComponent = () => <GameContainer />;

beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe("GameContainer component", () => {
  it("should render", () => {
    render(createComponent());
  });

  it("should disable the submit button until four items have been selected", async () => {
    const user = userEvent.setup();
    render(createComponent());
    // The button is defined and disabled
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
    // The words for the first item in the answer key
    const listElementA = screen.getByText("a");
    const listElementF = screen.getByText("f");
    const listElementK = screen.getByText("k");
    const listElementP = screen.getByText("p");

    expect(listElementA).toBeDefined();
    expect(listElementF).toBeDefined();
    expect(listElementK).toBeDefined();
    expect(listElementP).toBeDefined();

    await user.click(listElementA);
    await user.click(listElementK);
    await user.click(listElementF);
    await user.click(listElementP);
    expect(screen.getByRole("button", { name: /submit/i })).not.toBeDisabled();
    // screen.debug();
  });

  it("should show the correct answer when they are selected", async () => {
    const user = userEvent.setup();
    render(createComponent());
    // Gather the 4 words
    const listElementA = screen.getByText("a");
    const listElementF = screen.getByText("f");
    const listElementK = screen.getByText("k");
    const listElementP = screen.getByText("p");

    // Click the 4 words
    await user.click(listElementA);
    await user.click(listElementK);
    await user.click(listElementF);
    await user.click(listElementP);

    // Click the submit button
    await user.click(screen.getByRole("button", { name: /submit/i }));
    // Answer 1 and a,f,k,p should show up
    // screen.debug();
    expect(screen.queryByText("Answer 1")).not.toBeNull();
    expect(screen.queryByText("a")).toBeNull();
    expect(screen.queryByText("a,f,k,p")).not.toBeNull();
  });

  it('should reduce the number of "Mistakes remaining" when the guess is incorrect', async () => {
    const user = userEvent.setup();
    render(createComponent());
    const listElementA = screen.getByText("a");
    const listElementF = screen.getByText("f");
    const listElementK = screen.getByText("k");
    const listElementE = screen.getByText("e");

    // Click the 4 words
    await user.click(listElementA);
    await user.click(listElementK);
    await user.click(listElementF);
    await user.click(listElementE);

    // Click the submit button
    expect(screen.queryByTestId("circle-3")).not.toBeNull();
    await user.click(screen.getByRole("button", { name: /submit/i }));

    // Expect one of the circles to be removed
    expect(screen.queryByTestId("circle-3")).toBeNull();
  });

  // it("should show the reset modal when the Reset button is clicked", async () => {
  //   const user = userEvent.setup();
  //   render(createComponent());

  //   // Initially, The modal should be not showing
  //   expect(screen.queryByText("Do you want to try again")).toBeNull();
  //   // Click the reset button
  //   await user.click(screen.getByRole("button", { name: /reset/i }));
  //   // The modal should appear
  //   // Note, as of 02/2025, there's no support for the native dialog elements we're using here
  //   // So this test is largely for show
  //   // See more: https://github.com/jsdom/jsdom/issues/3294
  //   expect(screen.queryByText("Do you want to try again")).not.toBeNull();
  //   expect(screen.queryByText("Start over?")).not.toBeNull();
  // });
});
