/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import GreenButton from "src/components/common/buttons/GreenButton";

describe("GreenButton", () => {
  it("renders with the correct label", () => {
    render(<GreenButton label="Test Button" type="button" />);
    expect(screen.getByRole("button", { name: /test button/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<GreenButton label="Click Me" type="button" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <GreenButton label="Can't Click" type="button" onClick={handleClick} disabled />
    );

    const button = screen.getByRole("button", { name: /can't click/i });
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
