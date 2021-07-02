import { fireEvent, render, screen } from "@testing-library/react";
import Paginate from "./Paginate";

const mockHandleCurrentPage = jest.fn();

describe("Paginate component", () => {
  it("should render correctly", () => {
    render(
      <Paginate currentPage={1} handleCurrentPage={mockHandleCurrentPage} />
    );
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("should render max pages correctly", () => {
    const maxPage = 10;
    render(
      <Paginate
        currentPage={1}
        handleCurrentPage={mockHandleCurrentPage}
        maxPage={maxPage}
      />
    );
    expect(screen.queryAllByTestId("paginate-link")).toHaveLength(maxPage);
  });

  it("should change the current page correctly", () => {
    const maxPage = 10;
    render(
      <Paginate
        currentPage={1}
        handleCurrentPage={mockHandleCurrentPage}
        maxPage={maxPage}
      />
    );

    fireEvent.click(screen.getByText("2"));

    expect(mockHandleCurrentPage).toBeCalled();
  });
});
