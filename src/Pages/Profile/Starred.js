import React from "react";
import { useState, useEffect } from "react";
// import { getStars } from "./Starred.actions";
import SingleStarred from "../../Components/SingleStarred/SingleStarred";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { getStarredRepos } from "./Profile.actions";
import { useParams } from "react-router-dom";
import PrevNext from "../../Components/Pagination/PrevNext";

export default function Starred(props) {
  const [starredUrl, setStarredUrl] = useState("");
  const [starredReposList, setStarredReposList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const profile = useSelector((state) => state.signin.data);
  const login = profile.login;
  const name = useParams();
  const [userName, setUsername] = useState("");

  useEffect(() => {
    setUsername(name.login);
  }, [name]);

  useEffect(() => {
    if (userName && login) {
      if (userName !== login) {
        if (props.starredReposUrl) {
          setStarredUrl(props.starredReposUrl);
        }
      } else {
        const starredurl = profile.starred_url.toString().split("{");
        setStarredUrl(starredurl[0]);
      }
    }
  }, [userName, login]);

  useEffect(() => {
    if (userName && login) {
      if (starredUrl) {
        getStarredRepos(starredUrl, setStarredReposList, setIsLoading, page);
      }
    }
  }, [login, userName, setStarredReposList, starredUrl, page]);

  const handlePageClick = (nr) => {
    setPage(nr);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {userName && starredReposList.length !== 0 ? (
            starredReposList.map((singleStarred) => (
              <SingleStarred
                key={singleStarred.id}
                singleStarred={singleStarred}
              />
            ))
          ) : (
            <div className={`d-flex align-items-center norepositories`}>
              <i className="fa fa-solid fa-search px-2"></i>`{userName}` has no
              starred repositories!
            </div>
          )}
          <div className=" my-4">
            <PrevNext
              page={page}
              selectPage={handlePageClick}
              hasNext={starredReposList.length < 30 ? false : true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
