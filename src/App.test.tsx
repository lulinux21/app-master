import { render, screen } from "@testing-library/react";
import App from "./App";

describe("test", () => {
  it("deve renderizar app", () => {
    render(<App />);

    expect(screen.getByText("Vite + React"));
    screen.logTestingPlaygroundURL();
  });
});
