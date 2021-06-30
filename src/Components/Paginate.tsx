import React from "react";
import { Pagination } from "react-bootstrap";

interface IPaginate {
  currentPage: number;
  handleCurrentPage: (page: number) => void;
  maxPage?: number;
}

const Paginate: React.FC<IPaginate> = ({
  currentPage,
  handleCurrentPage,
  maxPage = 5,
}) => {
  const links = Array.from(Array(maxPage).keys());

  return (
    <Pagination>
      {/* <Pagination.First /> */}
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => handleCurrentPage(currentPage - 1)}
      />
      {links.map((link, i) => (
        <Pagination.Item
          key={`paginate-${i}`}
          data-testid={`paginate-link`}
          onClick={() => handleCurrentPage(link + 1)}
          className={`${currentPage === link + 1 ? "active" : ""}`}
        >
          {link + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === maxPage}
        onClick={() => handleCurrentPage(currentPage + 1)}
      />
      {/* <Pagination.Last /> */}
    </Pagination>
  );
};

export default Paginate;
