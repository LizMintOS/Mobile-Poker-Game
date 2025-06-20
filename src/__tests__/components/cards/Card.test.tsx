/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import PlayingCard from "src/components/cards/Card";

describe("PlayingCard", () => {
  const cardName = "10H";

  it("renders card image with correct src", () => {
    render(<PlayingCard cardName={cardName} />);
    const img = screen.getByAltText("card") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(`/cards/${cardName}.png`);
  });

  it("applies cursor-pointer class when selectCard is provided", () => {
    const mockSelectCard = jest.fn();
    const { container } = render(
      <PlayingCard cardName={cardName} selectCard={mockSelectCard} />
    );
    const wrapperDiv = container.firstChild as HTMLElement;
    expect(wrapperDiv.className).toContain("cursor-pointer");
  });

  it("does not apply cursor-pointer class when selectCard is not provided", () => {
    const { container } = render(<PlayingCard cardName={cardName} />);
    const wrapperDiv = container.firstChild as HTMLElement;
    expect(wrapperDiv.className).not.toContain("cursor-pointer");
  });

  it("applies selection styling when isSelected is true", () => {
    const { container } = render(
      <PlayingCard cardName={cardName} isSelected={true} />
    );
    const wrapperDiv = container.firstChild as HTMLElement;
    expect(wrapperDiv.className).toContain("shadow-green-500");
  });

  it("calls selectCard when clicked", () => {
    const mockSelectCard = jest.fn();
    render(
      <PlayingCard
        cardName={cardName}
        selectCard={mockSelectCard}
        isSelected={false}
      />
    );
    const wrapperDiv = screen.getByRole("img").closest("div")!;
    fireEvent.click(wrapperDiv);
    expect(mockSelectCard).toHaveBeenCalledWith(cardName, true);
  });

  it("does not throw when clicked without selectCard", () => {
    const { container } = render(<PlayingCard cardName={cardName} />);
    const wrapperDiv = container.firstChild as HTMLElement;
    expect(() => fireEvent.click(wrapperDiv)).not.toThrow();
  });
});
