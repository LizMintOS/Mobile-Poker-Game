/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Instructions from "src/components/GameInstructionsInfo";

describe("Instructions", () => {
  beforeEach(() => {
    render(<Instructions />);
  });

  it("renders main heading with correct text and class", () => {
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /Your Turn!/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("font-semibold", "text-green-700", "mb-6");
  });

  it("renders subheading about refreshing the page", () => {
    const subheading = screen.getByText(
      /Refreshing page will reset your turn!/i
    );
    expect(subheading).toBeInTheDocument();
    expect(subheading.tagName).toBe("H3");
    expect(subheading).toHaveClass("text-green-500", "italic");
  });

  it("renders instruction paragraphs", () => {
    expect(
      screen.getByText(
        /Click cards that you want to swap then press the "Swap Cards" button./i
      )
    ).toBeInTheDocument();

    const italicParagraph = screen.getByText(
      /Careful! You can only swap once./i
    );
    expect(italicParagraph).toBeInTheDocument();
    expect(italicParagraph).toHaveClass("italic", "mb-2");
  });

  it("renders final instruction heading", () => {
    const endTurnHeading = screen.getByRole("heading", {
      level: 3,
      name: /When you've finished, press end turn/i,
    });
    expect(endTurnHeading).toBeInTheDocument();
    expect(endTurnHeading).toHaveClass("mb-4");
  });
});
