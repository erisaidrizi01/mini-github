import React from "react";
import { Pagination } from "react-bootstrap";
import { useState } from "react";
import styles from "./Pagination.module.css";

export default function PrevNext(props) {
  const [currentPage, setCurrentPage] = useState(props.page);

  function goToNextPage() {
    props.selectPage(currentPage + 1);
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    props.selectPage(currentPage - 1);
    setCurrentPage((page) => page - 1);
  }

  return (
    <div className="pagination ">
      <div className="d-flex justify-content-between">
        <div>
          {currentPage !== 1 ? (
            <Pagination.Prev onClick={goToPreviousPage}>
              <span className={`${styles.pagbtn}`}>Previous</span>
            </Pagination.Prev>
          ) : null}
        </div>
        <div>
          {props.hasNext ? (
            <Pagination.Next
              onClick={goToNextPage}
              className={`${styles.pagbtn}`}
            >
              <span className={`${styles.pagbtn}`}>Next</span>
            </Pagination.Next>
          ) : null}
        </div>
      </div>
    </div>
  );
}
