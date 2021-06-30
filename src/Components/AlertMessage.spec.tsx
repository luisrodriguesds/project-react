import { render, screen } from "@testing-library/react";
import AlertMessage from "./AlertMessage";

// jest.mock('next/route', () => {
//   return {
//     useRoute() {
//       return {
//         asPath: '/'
//       }
//     }
//   }
// })

describe("AlertMessage component", () => {
  it("should render correctly", () => {
    function handleIsOpen(isOpen: boolean) {}
    render(
      <AlertMessage
        handleIsOpen={handleIsOpen}
        isOpen={true}
        message="Alert test"
        variant="danger"
      />
    );

    expect(screen.getByText("Alert test")).toBeInTheDocument();
  });

  // it("should close when click in close button", () => {
  //   const [isOpen, setIsOpen] = useState(true);

  //   const { getByTestId, getByText } = render(
  //     <AlertMessage
  //       handleIsOpen={setIsOpen}
  //       isOpen={isOpen}
  //       message="Alert test"
  //       variant="danger"
  //     />
  //   );
  //   getByTestId("alert-close-button").click();
  //   expect(getByText("Alert test")).toBeInTheDocument();
  // });

  it("should close correctly", async () => {
    function handleIsOpen(isOpen: boolean) {}

    render(
      <AlertMessage
        handleIsOpen={handleIsOpen}
        isOpen={false}
        message="Alert test"
        variant="danger"
      />
    );

    expect(screen.queryByText("Alert test")).not.toBeInTheDocument();
  });
});
