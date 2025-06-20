/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { LoadingWrapper } from "src/components/common/LoadingWrapper";

// Mock ClipLoader to inspect props
jest.mock("react-spinners/ClipLoader", () => (props: any) => {
  return (
    <div data-testid="loader" data-size={props.size} style={props.style}>
      Loading spinner
    </div>
  );
});

describe("LoadingWrapper", () => {
  it("renders loader when loading is true", () => {
    render(
      <LoadingWrapper loading={true}>
        <div>ggrgrsggrssrg</div>
      </LoadingWrapper>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.queryByText("ggrgrsggrssrg")).not.toBeInTheDocument();
  });

  it("renders children when loading is false", () => {
    render(
      <LoadingWrapper loading={false}>
        <div>helloooo</div>
      </LoadingWrapper>
    );

    expect(screen.getByText("helloooo")).toBeInTheDocument();
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });
});
