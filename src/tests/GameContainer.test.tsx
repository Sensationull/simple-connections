import { describe, it, expect } from "vitest";

describe("something truthy and falsy", () => {
  it(" returns true", () => {
    expect(true).toBe(true);
  });
  it(" returns false", () => {
    expect(false).toBe(false);
  });
});
