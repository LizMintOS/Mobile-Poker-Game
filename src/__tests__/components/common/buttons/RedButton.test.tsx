/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import RedButton from "src/components/common/buttons/RedButton";

describe("RedButton", () => {
  it("renders with given label", () => {
    render(<RedButton label="Click Me" onClick={() => {}} />);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("calls onClick when pressed", () => {
    const onClick = jest.fn();
    render(<RedButton label="Press" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", { name: /press/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
