import { fireEvent, render, screen } from "@testing-library/react";
import AlertMessage from "./AlertMessage";

const mockHandleIsOpen = jest.fn();
mockHandleIsOpen.mockClear();

describe("AlertMessage component", () => {
  it("should render correctly", () => {
    render(
      <AlertMessage
        handleIsOpen={mockHandleIsOpen}
        isOpen={true}
        message="Alert test"
        variant="danger"
      />
    );

    expect(screen.getByText("Alert test")).toBeInTheDocument();
  });

  it("should close correctly", async () => {
    render(
      <AlertMessage
        handleIsOpen={mockHandleIsOpen}
        isOpen={false}
        message="Alert test"
        variant="danger"
      />
    );

    expect(screen.queryByText("Alert test")).not.toBeInTheDocument();
  });

  it("should close when click in close button", async () => {
    render(
      <AlertMessage
        handleIsOpen={mockHandleIsOpen}
        isOpen={true}
        message="Alert test"
        variant="danger"
      />
    );

    fireEvent.click(screen.getByTestId("btn-alert-close"));

    expect(mockHandleIsOpen).toBeCalled();
  });
});
