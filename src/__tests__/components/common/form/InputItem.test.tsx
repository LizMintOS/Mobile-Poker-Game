/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import InputItem from "src/components/common/form/InputItem";

// Mock ErrorMessage component
jest.mock(
  "src/components/common/ErrorMessage",
  () =>
    ({ message }: { message: string }) =>
      <div data-testid="error-message">{message}</div>
);

describe("InputItem", () => {
  const defaultProps = {
    label: "Username",
    type: "text",
    register: undefined,
    value: "",
    error: "",
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label and input with placeholder", () => {
    render(<InputItem {...defaultProps} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your username/i)
    ).toBeInTheDocument();
  });

  it("renders input with value and calls onChange when register is not provided", () => {
    render(<InputItem {...defaultProps} value="test value" />);
    const input = screen.getByLabelText(/username/i) as HTMLInputElement;
    expect(input.value).toBe("test value");

    fireEvent.change(input, { target: { value: "changed value" } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it("renders input using register props when provided", () => {
    const onChangeMock = jest.fn();
    const register = {
      name: "username",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChangeMock(e),
      onBlur: jest.fn(),
      ref: jest.fn(),
    };
    render(<InputItem {...defaultProps} register={register} />);
    const input = screen.getByLabelText(/username/i);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "changed" } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("displays error message and applies error styles when error prop is set", () => {
    render(<InputItem {...defaultProps} error="This field is required" />);
    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "This field is required"
    );

    const input = screen.getByLabelText(/username/i);
    expect(input).toHaveClass("border-red-500");
  });

  it("applies correct input type", () => {
    render(<InputItem {...defaultProps} type="email" />);
    expect(screen.getByLabelText(/username/i)).toHaveAttribute("type", "email");
  });
});
