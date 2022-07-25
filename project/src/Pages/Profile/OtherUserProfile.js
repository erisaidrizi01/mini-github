import React, { useState, useEffect } from "react";
import { getUserData } from "../AllSearchResults/User.actions";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import ProfileTabs from "../../Components/ProfileTabs/ProfileTabs";
import { Container, Col, Row, Image, Badge } from "react-bootstrap";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import FollowOtherButton from "../../Components/FollowUserButton/FollowOtherButton";
import { getFollowingData } from "./Profile.actions";

import { unfollowUser, followUser } from "./Profile.actions";

export default function OtherUserProfile() {
  console.log("OtherUserProfile");
  const [user, setUser] = useState({});
  const [reposUrl, setReposUrl] = useState("");
  const [starredUrl, setStarredUrl] = useState("");
  const [followersUrl, setFollowersUrl] = useState("");
  const [followingUrl, setFollowingUrl] = useState("");
  const [btnTitle, setBtnTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const name = useParams();

  const [userName, setUsername] = useState("");
  // const userLogin = useSelector((state) => state.signin.data.login);

  useEffect(() => {
    if (name) {
      setUsername(name.login);
    }
  }, [name]);

  useEffect(() => {
    if (userName) {
      getUserData(userName, setUser, setIsLoading);
      getFollowingData(userName, setBtnTitle);
    }
  }, [userName]);

  const {
    avatar_url,
    followers,
    followers_url,
    following,
    following_url,
    public_repos,
    login,
    repos_url,
    starred_url,
  } = user;

  useEffect(() => {
    if (user) {
      if (repos_url) {
        const words = following_url.toString().split("{");
        setFollowingUrl(words[0]);
        const starred = starred_url.toString().split("{");
        setReposUrl(repos_url);
        setStarredUrl(starred[0]);
        setFollowersUrl(followers_url);
      }
    }
  }, [user, repos_url]);

  const handleUnFollowing = () => {
    if (userName) {
      unfollowUser(userName);
      // props.handleFollowingUpdate(userName);
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
  return (
    <Container fluid>
      {isLoading && <LoadingSpinner />}{" "}
      {!isLoading && (
        <Row
          style={{ padding: "4%" }}
          className={`d-flex justify-content-center ${styles.textsize}`}
        >
          <Col xs={3}>
            <Image
              className={`${styles.image} d-flex justify-content-center align-items-center my-2`}
              alt="Profile picture"
              src={avatar_url}
              roundedCircle
            ></Image>
            <div>
              <Badge bg="info">
                <p className={`${styles.name}`}>{login}</p>
              </Badge>
            </div>
            <div className="my-3 d-flex ">
              <FollowOtherButton
                btnTitle={btnTitle}
                handleFollow={handleFollow}
              />
            </div>
          </Col>
          <Col xs={6}>
            {userName && user && (
              <ProfileTabs
                login={login}
                numberOfFollowers={followers}
                numberOfFollowing={following}
                followingListUrl={followingUrl}
                // followingList={followingList}
                // followersList={followersList}
                numberOfRepos={public_repos}
                followersUrl={followersUrl}
                starredReposUrl={starredUrl}
                reposUrl={reposUrl}
              />
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
}
