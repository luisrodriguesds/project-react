import { render, screen } from "@testing-library/react";
import Template from "./Template";

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

describe("Tempalte component", () => {
  it("should render correctly", () => {
    render(<Template>Template Test</Template>);
    expect(screen.getByText("Template Test")).toBeInTheDocument();
  });
});
