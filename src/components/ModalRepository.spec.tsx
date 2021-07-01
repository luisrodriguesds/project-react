import { render, screen } from "@testing-library/react";
import ModalRepository from "./ModalRepository";

const mockHandleIsOpen = jest.fn();
mockHandleIsOpen.mockClear();

jest.mock("../contexts/auth", () => {
  return {
    useAuth() {
      return {
        user: {
          id: 123456789,
          name: "Jhon Doe",
        },
      };
    },
  };
});

jest.mock("../contexts/star", () => {
  return {
    useStar() {
      return {
        checkStar: ({
          repository_id,
          user_id,
        }: {
          repository_id: number;
          user_id: string;
        }) => {
          if (String(repository_id) === user_id) {
            return true;
          }
          return false;
        },
      };
    },
  };
});

describe("Modal component", () => {
  it("should render corretly", () => {
    const repository = {
      id: 123456789,
      full_name: "fake-name",
      description: "fake-descrition",
      owner: {
        login: "fake-login",
        avatar_url: "fake-avatar-url",
      },
    };
    render(
      <ModalRepository
        isOpen={true}
        handleIsOpen={mockHandleIsOpen}
        repository={repository}
      />
    );

    expect(screen.getByText("fake-name")).toBeInTheDocument();
    expect(screen.getByText("fake-descrition")).toBeInTheDocument();
    expect(screen.getByText("fake-login")).toBeInTheDocument();
    // expect(screen.getByText("fake-avatar-url")).toBeInTheDocument();
  });

  // it("should render the user name corretly", () => {
  //   render(<Header />);
  //   expect(screen.getByTestId("header-user-name")).toHaveTextContent(
  //     "Jhon Doe"
  //   );
  // });
});
