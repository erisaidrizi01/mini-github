import React from "react";
import { useState, useEffect } from "react";
import Image from "react-bootstrap/esm/Image";
import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";
import { getUserData } from "./AllSearchResults/User.actions";
// import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import FollowButton from "../Components/FollowButton/FollowButton";
// import { followUser } from "../Pages/Profile/Following.actions";
import { unfollowUser } from "./Profile/Profile.actions";
import LoadingDots from "../Components/LoadingDots/LoadingDots";
import { followUser } from "./Profile/Profile.actions";

export default function User(props) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userName = props.user.login;

  useEffect(() => {
    if (userName) {
      getUserData(userName, setUser, setIsLoading);
    }
  }, [userName]);

  const [btnTitle, setBtnTitle] = useState("Unfollow");

  const handleUnFollowing = () => {
    if (userName) {
      unfollowUser(userName);
      props.handleFollowingUpdate(userName);
    }
  };

  const handleFollowing = () => {
    if (userName) {
      followUser(userName);
      // props.handleFollowingUpdate(userName);
    }
  };

  const handleFollow = (name, btnTitle) => {
    setBtnTitle(btnTitle === "Follow" ? "Unfollow" : "Follow");

    if (btnTitle === "Unfollow") handleUnFollowing(name);
    if (btnTitle === "Follow") {
      handleFollowing(name);
    }
  };
  const { bio, email, location, login, name } = user;

  return (
    <div>
      {user ? (
        isLoading ? (
          <LoadingDots />
        ) : (
          <div
            className={`my-4 ${styles.borderBottom} d-flex justify-content-between`}
          >
            <div className="d-flex px-0">
              <div className="flex-shrink-0 mr-2">
                <Image
                  src={user.avatar_url}
                  width="20px"
                  height="20px"
                  alt="user profile image"
                  roundedCircle
                ></Image>
              </div>
              <div className="flex-auto">
                <div className={`${styles.nameLogin} d-flex px-3`}>
                  {name && (
                    <p
                      className={`${styles.name} me-3`}
                      onClick={() =>
                        navigate(`/profile/${login}?tab=repositories`)
                      }
                    >
                      {name}
                    </p>
                  )}

                  <p
                    className={`${styles.login} mx-1`}
                    onClick={() =>
                      navigate(`/profile/${login}?tab=repositories`)
                    }
                  >
                    {login}
                  </p>
                </div>

                <div>
                  <p className={`${styles.bio} px-3`}>{bio}</p>
                </div>

                <div className={`${styles.locationEmail}`}>
                  <p className="px-3">{location}</p>
                  <p className="px-3">{email}</p>
                </div>
              </div>
            </div>
            {props.hasButton && btnTitle ? (
              <FollowButton
                userLogin={userName}
                handleFollow={handleFollow}
                btnTitle={btnTitle}
                setBtnTitle={setBtnTitle}
              />
            ) : null}
          </div>
        )
      ) : null}
    </div>
  );
}
