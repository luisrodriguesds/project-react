import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

const wait = (amount = 0): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0): Promise<void> => {
  await act(async () => {
    await wait(amount);
  });
};

describe("Testing Aplication", () => {
  it("should receive error alert with wrong email or password", async () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "fake_email@fake.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    await actWait(500);

    fireEvent.click(screen.getByRole("button"));

    await actWait(7000);

    expect(screen.getByText("Email or password is worng")).toBeInTheDocument();
  }, 9000);

  it("should do the login correctly", async () => {
    render(<App />);

    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();

    const linkElement = screen.getByText("Sign In");
    expect(linkElement).toBeEnabled();
    expect(linkElement).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "lucas@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    await actWait(500);

    fireEvent.click(screen.getByRole("button"));

    await actWait(7000);

    expect(window.location.pathname === "/catalog").toBeTruthy();
  }, 9000);

  it("should search for repository on github", async () => {
    render(<App />);

    expect(
      screen.getByPlaceholderText("Search Repo on Github!")
    ).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Search Repo on Github!"), {
      target: { value: "facebook" },
    });

    await actWait(5000);

    expect(screen.queryAllByTestId("repo-item-1")).toHaveLength(1);
  }, 9000);
});
