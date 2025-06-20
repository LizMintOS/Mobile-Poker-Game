import { render, screen } from "@testing-library/react";
import EndGameInfoBox from "src/components/EndGameInfoBox";

const mockGame = {
  scores: [
    { name: "One Pair", score: 10 },
    { name: "Royal Flush", score: 15 },
    { name: "Full House", score: 15 },
  ],
};

describe("EndGameInfoBox", () => {
  it("renders final scores and winners correctly", () => {
    render(<EndGameInfoBox game={mockGame as any} />);

    expect(screen.getByText("Player 1:")).toBeInTheDocument();
    expect(screen.getByText("One Pair")).toBeInTheDocument();
    expect(screen.getByText("Player 1:").parentElement).toHaveTextContent(
      "10 pts"
    );

    expect(screen.getByText("Player 2:")).toBeInTheDocument();
    expect(screen.getByText("Royal Flush")).toBeInTheDocument();
    expect(screen.getByText("Player 2:").parentElement).toHaveTextContent(
      "15 pts"
    );

    expect(screen.getByText("Player 3:")).toBeInTheDocument();
    expect(screen.getByText("Full House")).toBeInTheDocument();
    expect(screen.getByText("Player 3:").parentElement).toHaveTextContent(
      "15 pts"
    );

    expect(screen.getByText(/Winner/)).toBeInTheDocument();
    expect(screen.getByText("Player 2,")).toBeInTheDocument();
    expect(screen.getByText("Player 3")).toBeInTheDocument();
  });
});
