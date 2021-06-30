import React from "react";
import { Pagination } from "react-bootstrap";

interface IPaginate {
  currentPage: number;
  handleCurrentPage: (page: number) => void;
}

const Paginate: React.FC<IPaginate> = ({ currentPage, handleCurrentPage }) => {
  const links = Array.from(Array(5).keys());

  return (
    <Pagination>
      {/* <Pagination.First /> */}
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => handleCurrentPage(currentPage - 1)}
      />
      {links.map((link) => (
        <Pagination.Item
          onClick={() => handleCurrentPage(link + 1)}
          className={`${currentPage === link + 1 ? "active" : ""}`}
        >
          {link + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === 5}
        onClick={() => handleCurrentPage(currentPage + 1)}
      />
      {/* <Pagination.Last /> */}
    </Pagination>
  );
};

export default Paginate;
