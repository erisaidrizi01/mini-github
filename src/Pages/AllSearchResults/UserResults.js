import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./UserResults.module.css";
import Pages from "../../Components/Pagination/Pages";
import User from "../User";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { getUsersData } from "./UserResults.actions";
import PerPageDropdown from "../../Components/PerPageDropdown/PerPageDropdown";

export default function UserResults() {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); //setSearchParams
  const searchVal = searchParams.get("q");
  const [usersResults, setUsersResults] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);
  const [per_page, setPerPage] = useState(5);
  const [dropTitle, setdropTitle] = useState(5);

  const handlePerPageClick = (e) => {
    setPerPage(e.target.getAttribute("value"));
    setdropTitle(e.target.getAttribute("value"));
    // await console.log("sapo klikove perpagee", per_page);
  };

  useEffect(() => {
    getUsersData(
      searchVal,
      setLoading,
      setUsersResults,
      page,
      setTotalPages,
      per_page
    );
  }, [page, searchVal, per_page]);

  const handlePageClick = (nr) => {
    setPage(nr);
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.searchResults}>
          {!usersResults ? (
            <LoadingSpinner />
          ) : (
            <div>
              <div className="d-flex justify-content-end">
                {usersResults.length !== 0 ? (
                  <PerPageDropdown
                    title={dropTitle}
                    selectPerPage={handlePerPageClick}
                  />
                ) : null}
              </div>
              <div>
                {usersResults.map((user, id) => (
                  <User user={user} key={id} />
                ))}
              </div>
            </div>
          )}
          {usersResults.length !== 0 ? (
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
              We couldn’t find any user matching '{searchVal}'
            </div>
          )}
        </div>
      )}
    </div>
  );
}
