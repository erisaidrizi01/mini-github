import React from "react";
import { Pagination } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

export default function Pages(props) {
  const pageLimit = 10;

  const [currentPage, setCurrentPage] = useState(props.page);

  // useEffect(() => {
  //   props.selectPage(1);
  //   setCurrentPage(1);
  // }, [props.searchVal]);

  function goToNextPage() {
    props.selectPage(currentPage + 1);
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    props.selectPage(currentPage - 1);
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    props.selectPage(pageNumber);
    setCurrentPage(pageNumber);
  }

  // const getPaginatedData = () => {
  //   const startIndex = currentPage * dataLimit - dataLimit;
  // const endIndex = startIndex + dataLimit;
  // return data.slice(startIndex, endIndex);
  // };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(10).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      <div className="pagination">
        <Pagination.Prev
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </Pagination.Prev>

        {getPaginationGroup().map((item, index) =>
          item <= props.totalPages ? (
            <Pagination.Item
              key={index}
              onClick={changePage}
              className={`paginationItem ${
                currentPage === item && currentPage <= props.totalPages
                  ? "active"
                  : "null"
              }`}
            >
              <span>{item}</span>
            </Pagination.Item>
          ) : null
        )}

        {/* next button */}
        <Pagination.Next
          onClick={goToNextPage}
          className={`next ${
            currentPage === props.totalPages ? "disabled" : ""
          }`}
        >
          next
        </Pagination.Next>
      </div>
    </div>
  );
}
