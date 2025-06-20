/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import ErrorMessage from "src/components/common/ErrorMessage";

describe("ErrorMessage component", () => {
  it("renders the error message text", () => {
    const errorText = "This is an error";
    render(<ErrorMessage message={errorText} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });

  it("applies the correct CSS classes", () => {
    const errorText = "Error text";
    render(<ErrorMessage message={errorText} />);
    const div = screen.getByText(errorText);
    expect(div).toHaveClass("text-sm");
    expect(div).toHaveClass("text-red-500");
  });
});
