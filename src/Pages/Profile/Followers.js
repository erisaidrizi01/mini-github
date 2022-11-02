import React from "react";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getFollowers } from "./Profile.actions";
import User from "../User";
import Pages from "../../Components/Pagination/Pages";
import { useParams } from "react-router-dom";

export default function Followers(props) {
  const name = useParams();
  const [userName] = useState(name.login);

  const profile = useSelector((state) => state.signin.data);
  const login = profile.login;

  const [followersUrl, setFollowersUrl] = useState("");
  const [followersList, setFollowersList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userName && login) {
      if (userName !== login) {
        if (props.followersUrl) {
          setTotalPages(Math.ceil(props.numberOfFollowers / 5));
          setFollowersUrl(props.followersUrl);
        }
      } else {
        const noFollowers = profile.followers;
        setTotalPages(Math.ceil(noFollowers / 5));
        const followersurl = profile.followers_url.toString().split("{");
        setFollowersUrl(followersurl[0]);
      }
    }
  }, [userName, login, props.followersUrl]);

  useEffect(() => {
    if (userName && login) {
      if (userName === login) {
        if (followersUrl) {
          getFollowers(followersUrl, setFollowersList, setIsLoading, page);
        }
      } else {
        if (followersUrl) {
          getFollowers(followersUrl, setFollowersList, setIsLoading, page);
        }
      }
    }
  }, [login, userName, page, followersUrl]);

  const handlePageClick = (nr) => {
    setPage(nr);
  };

  return (
    <div className="section">
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            {userName && followersList.length !== 0 ? (
              followersList.map((user) => (
                <User key={user.id} user={user} hasButton={props.hasButton} />
              ))
            ) : (
              <div className={`d-flex align-items-center norepositories`}>
                <i className="fa fa-solid fa-search px-2"></i>`{userName}` has
                no followers !
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
        )}
      </div>
    </div>
  );
}
