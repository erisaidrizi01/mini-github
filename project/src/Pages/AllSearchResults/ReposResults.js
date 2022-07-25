import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Repository from "../../Components/Repository/Repository";
import Pages from "../../Components/Pagination/Pages";
import { getData } from "./ReposResults.actions";
import styles from "./ReposResults.module.css";
import PerPageDropdown from "../../Components/PerPageDropdown/PerPageDropdown";

export default function ReposResults() {
  const [loading, setLoading] = useState(true);
  const [reposResults, setReposResults] = useState([]);
  const [searchParams] = useSearchParams(); //+setSearchParams
  const searchVal = searchParams.get("q");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);
  const [per_page, setPerPage] = useState(5);
  const [dropTitle, setdropTitle] = useState(5);

  const handlePerPageClick = (e) => {
    setPerPage(e.target.getAttribute("value"));
    setdropTitle(e.target.getAttribute("value"));
  };

  useEffect(() => {
    getData(
      searchVal,
      setLoading,
      setReposResults,
      page,
      setTotalPages,
      per_page
    );
  }, [page, per_page, searchVal, setPerPage]);

  const handlePageClick = (nr) => {
    setPage(nr);
    console.log("page nga onClick", page);
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="d-flex justify-content-end">
            {reposResults.length !== 0 ? (
              <PerPageDropdown
                title={dropTitle}
                selectPerPage={handlePerPageClick}
              />
            ) : null}
          </div>
          <div>
            {reposResults.map((repo, id) => (
              <div key={id + 1} className={`my-4 ${styles.repres}`}>
                <Repository repo={repo} />
              </div>
            ))}
            {reposResults.length !== 0 ? (
              <div className="mb-5">
                <Pages
                  page={page}
                  totalPages={totalPages}
                  selectPage={handlePageClick}
                  searchVal={searchVal}
                />
              </div>
            ) : (
              <div
                className={`d-flex justify-content-center align-items-center ${styles.noresults}`}
              >
                <i className="fa fa-solid fa-search px-2"></i>
                We couldn’t find any repositories matching '{searchVal}'
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
