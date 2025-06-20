/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Title from "src/components/common/Title";

describe("Title component", () => {
  it("renders the title text", () => {
    render(<Title title="Hello World" />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies the default CSS classes", () => {
    render(<Title title="Test Title" />);
    const heading = screen.getByText("Test Title");
    expect(heading).toHaveClass("text-3xl");
    expect(heading).toHaveClass("font-bold");
    expect(heading).toHaveClass("text-center");
  });

  it("adds additional classes when style prop is provided", () => {
    render(<Title title="Styled Title" style="text-red-500" />);
    const heading = screen.getByText("Styled Title");
    expect(heading).toHaveClass("text-red-500");
  });
});
