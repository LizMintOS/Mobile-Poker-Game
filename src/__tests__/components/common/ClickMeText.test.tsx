/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import ClickMeText from "src/components/common/ClickMeText";

describe("ClickMeText component", () => {
  const message = "Click me!";
  const onClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the message text", () => {
    render(<ClickMeText message={message} onClick={onClick} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("calls onClick when the message text is clicked", () => {
    render(<ClickMeText message={message} onClick={onClick} />);
    const clickableText = screen.getByText(message);
    fireEvent.click(clickableText);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders the pointing emoji icon", () => {
    render(<ClickMeText message={message} onClick={onClick} />);
    expect(screen.getByText("👉")).toBeInTheDocument();
  });
});
