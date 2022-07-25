import React, { useEffect, useState } from "react";
import ProfileRepository from "../../Components/ProfileRepository/ProfileRepository";
import "./Repositories.css";
import Pages from "../../Components/Pagination/Pages";
import { getRepositories } from "./Profile.actions";

import { useSelector } from "react-redux";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { useParams } from "react-router-dom";
import { getOtherRepositories } from "./Profile.actions";

export default function Repositories(props) {
  const name = useParams();

  const [userName, setUsername] = useState("");

  const [repositories, setRepositories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (name.login) {
      setUsername(name.login);
    }
  }, [name]);

  const login = useSelector((state) => state.signin.data.login);

  useEffect(() => {
    if (userName && login) {
      if (props.numberOfRepos) {
        setTotalPages(Math.ceil(props.numberOfRepos / 5));
      }
    }
  }, [userName, props.numberOfRepos]);

  useEffect(() => {
    if (userName && login) {
      if (userName === login) {
        getRepositories(page, setRepositories, setIsLoading);
      } else {
        getOtherRepositories(
          props.reposUrl,
          page,
          setRepositories,
          setIsLoading
        );
      }
    }
  }, [login, userName, page, props.reposUrl]);

  const handlePageClick = (nr) => {
    setPage(nr);
  };

  return (
    <div className="section">
      {loading ? (
        <LoadingSpinner />
      ) : repositories ? (
        <div>
          {repositories.length !== 0 ? (
            repositories.map((repository) => (
              <ProfileRepository key={repository.id} repository={repository} />
            ))
          ) : (
            <div className={`d-flex align-items-center norepositories`}>
              <i className="fa fa-solid fa-search px-2"></i>`{userName}` has no
              repositories !
            </div>
          )}
          <div className="mb-5">
            {totalPages > 0 && (
              <Pages
                page={page}
                totalPages={totalPages}
                selectPage={handlePageClick}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
