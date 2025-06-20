/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import PressButton from "src/components/common/buttons/PressButton";

describe("PressButton", () => {
  it("renders children content", () => {
    render(<PressButton>Test Button</PressButton>);
    expect(screen.getByRole("button", { name: /test button/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<PressButton onClick={onClick}>Click Me</PressButton>);
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("respects disabled prop", () => {
    const onClick = jest.fn();
    render(
      <PressButton disabled onClick={onClick}>
        Disabled
      </PressButton>
    );
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies style class", () => {
    const style = "bg-green-500";
    render(<PressButton style={style}>Styled</PressButton>);
    expect(screen.getByRole("button")).toHaveClass("bg-green-500");
  });
});
