import { render, screen } from "@testing-library/react";
import Paginate from "./Paginate";

describe("Paginate component", () => {
  it("should render corretly", () => {
    const handleCurrentPage = (page: number) => {};

    render(<Paginate currentPage={1} handleCurrentPage={handleCurrentPage} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("should render max pages corretly", () => {
    const handleCurrentPage = (page: number) => {};
    const maxPage = 10;
    render(
      <Paginate
        currentPage={1}
        handleCurrentPage={handleCurrentPage}
        maxPage={maxPage}
      />
    );
    expect(screen.queryAllByTestId("paginate-link")).toHaveLength(maxPage);
    // expect(screen.getByText("Previous")).toBeInTheDocument();
    // expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
