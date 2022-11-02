import { updateFollowingData } from "../SignIn/SignIn.actions";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFollowing } from "../SignIn/SignIn.actions";
import { getFollowingListData } from "../SignIn/SignIn.actions";
import User from "../User";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Pages from "../../Components/Pagination/Pages";

export default function Following(props) {
  const name = useParams();
  const profile = useSelector((state) => state.signin.data);

  const dispatch = useDispatch();

  const [following_url, setFollowingUrl] = useState("");
  const [followingList, setFollowing] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (profile && name) {
      if (profile.login === name.login) {
        if (profile.following_url) {
          const followingUrl = profile.following_url.toString().split("{");
          setFollowingUrl(followingUrl[0]);
          const noFollowing = profile.following;
          setTotalPages(Math.ceil(noFollowing / 5));
        }
      } else {
        if (props.followingListUrl) {
          const followingUrl = props.followingListUrl.toString().split("{");
          setFollowingUrl(followingUrl[0]);
          const noFollowing = props.numberOfFollowing;
          setTotalPages(Math.ceil(noFollowing / 5));
        }
      }
    }
  }, [name, profile, props.followingListUrl]);

  useEffect(() => {
    if (following_url) {
      getFollowing(following_url, setFollowing, page, setIsLoading);
    }
    if (name && profile.login) {
      if (name === profile.login) {
        if (followingList.length !== 0)
          dispatch(getFollowingListData(followingList));
      }
    }
  }, [following_url, page]);

  const updateFollowing = (userName) => {
    const updatedList = followingList.filter((word) => word.login !== userName);
    dispatch(updateFollowingData(updatedList));
    setFollowing(updatedList);
  };

  const handlePageClick = (nr) => {
    setPage(nr);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {name && followingList.length !== 0 ? (
            followingList.map((user) => (
              <User
                key={user.id}
                user={user}
                handleFollowingUpdate={updateFollowing}
                hasButton={props.hasButton}
              />
            ))
          ) : (
            <div className={`d-flex align-items-center norepositories`}>
              <i className="fa fa-solid fa-search px-2"></i>
              Not following anyone!
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
  );
}
