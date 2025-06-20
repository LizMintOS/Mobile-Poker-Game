/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import FormSubmitBody from "src/components/common/form/FormSubmitBody";

describe("FormSubmitBody", () => {
  it("renders GreenButton with correct label", () => {
    render(<FormSubmitBody disabled={false} label="Submit" />);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeInTheDocument();
  });

  it("disables GreenButton when disabled prop is true", () => {
    render(<FormSubmitBody disabled={true} label="Submit" />);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeDisabled();
  });

  it("renders children when provided", () => {
    render(
      <FormSubmitBody disabled={false} label="Submit">
        <p>Extra content</p>
      </FormSubmitBody>
    );
    const childContent = screen.getByText("Extra content");
    expect(childContent).toBeInTheDocument();
  });

  it("does not render children container when no children", () => {
    const { container } = render(
      <FormSubmitBody disabled={false} label="Submit" />
    );
    // check that no element with class flex-col exists
    const flexColDiv = container.querySelector(".flex-col");
    expect(flexColDiv).toBeNull();
  });
});
