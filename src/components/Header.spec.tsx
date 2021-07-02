import { render, screen } from "@testing-library/react";
import Header from "./Header";

jest.mock("../contexts/auth", () => {
  return {
    useAuth() {
      return {
        user: {
          name: "Jhon Doe",
        },
      };
    },
  };
});

describe("Header component", () => {
  it("should render correctly", () => {
    render(<Header />);
    expect(screen.getByText("Catalog")).toBeInTheDocument();
  });

  it("should render the user name correctly", () => {
    render(<Header />);
    expect(screen.getByTestId("header-user-name")).toHaveTextContent(
      "Jhon Doe"
    );
  });
});
