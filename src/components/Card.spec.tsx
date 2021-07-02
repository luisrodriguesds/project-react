import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card component", () => {
  it("should render fields correctly", () => {
    const fields = [
      {
        name: "email",
        value: "",
        placeholder: "Enter email",
        label: "Email Address",
        type: "email",
      },
      {
        name: "password",
        value: "",
        placeholder: "Password",
        label: "Password",
        type: "password",
      },
    ];
    render(<Card inputs={fields} varient="primary" />);

    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
