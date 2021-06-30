import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("should render corretly", () => {
    render(<Button title="Button test" variant="danger" />);

    expect(screen.getByText("Button test")).toBeInTheDocument();
  });

  it("should loading corretly", () => {
    render(<Button title="Button test" loading={true} variant="danger" />);
    expect(screen.queryByText("Button test")).not.toBeInTheDocument();
    expect(screen.queryByTestId("btn-spinner")).toBeInTheDocument();
  });
});