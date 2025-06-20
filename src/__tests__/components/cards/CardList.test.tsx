/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import PlayingCardList from "src/components/cards/CardList";

describe("PlayingCardList", () => {
  const cardNames = ["10H", "4S", "KD"];
  const selectedCards = ["10H", "KD"];

  it("renders correct number of PlayingCard components", () => {
    render(<PlayingCardList cardNames={cardNames} />);
    const images = screen.getAllByAltText("card");
    expect(images).toHaveLength(cardNames.length);
  });

  it("applies isSelected styling correctly to selected cards", () => {
    render(
      <PlayingCardList
        cardNames={cardNames}
        selectedCards={selectedCards as any}
      />
    );

    const firstCardWrapper = screen.getByTestId("playing-card-10H");
    const secondCardWrapper = screen.getByTestId("playing-card-4S");
    const thirdCardWrapper = screen.getByTestId("playing-card-KD");

    expect(firstCardWrapper.className).toContain("shadow-green-500");
    expect(secondCardWrapper.className).not.toContain("shadow-green-500");
    expect(thirdCardWrapper.className).toContain("shadow-green-500");
  });

  it("calls selectCard when a PlayingCard is clicked", () => {
    const mockSelectCard = jest.fn();

    render(
      <PlayingCardList
        cardNames={cardNames}
        selectCard={mockSelectCard}
        selectedCards={selectedCards as any}
      />
    );

    const images = screen.getAllByAltText("card");
    fireEvent.click(images[0].closest("div")!);
    expect(mockSelectCard).toHaveBeenCalled();
  });

  it("renders fine without selectCard prop", () => {
    const { container } = render(
      <PlayingCardList
        cardNames={cardNames}
        selectedCards={selectedCards as any}
      />
    );
    const images = container.querySelectorAll("img");
    expect(images.length).toBe(cardNames.length);
  });
});
