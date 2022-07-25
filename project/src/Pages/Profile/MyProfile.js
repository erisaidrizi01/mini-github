import React, { useEffect } from "react";
import { Container, Image, Badge } from "react-bootstrap";
import styles from "./Profile.module.css";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import ProfileTabs from "../../Components/ProfileTabs/ProfileTabs";
import { useState } from "react";

export default function MyProfile() {
  console.log("My profile");
  const profile = useSelector((state) => state.signin.data);
  const loading = useSelector((state) => state.signin.loading);

  const [numberOfRepos, setNumberOfRepos] = useState(0);
  const [numberOfFollowing, setNumberOfFollowing] = useState(0);

  useEffect(() => {
    if (profile !== undefined) {
      if (profile.public_repos) {
        setNumberOfFollowing(profile.following);
        setNumberOfRepos(profile.total_private_repos + profile.public_repos);
      }
    }
  }, [profile]);

  return (
    <Container fluid>
      {loading && <LoadingSpinner />}
      {!loading && (
        <Row
          style={{ padding: "4%" }}
          className={`d-flex justify-content-center ${styles.textsize}`}
        >
          <Col xs={3}>
            <Image
              className={`${styles.image} d-flex justify-content-center align-items-center my-2`}
              alt="Profile picture"
              src={profile.avatar_url}
              roundedCircle
            ></Image>
            <div>
              <Badge bg="info">
                <p className={`${styles.name}`}>{profile.login}</p>
              </Badge>
            </div>
          </Col>
          <Col xs={6}>
            <ProfileTabs
              login={profile.login}
              numberOfFollowers={profile.followers}
              numberOfFollowing={numberOfFollowing}
              // followingList={following}
              // followersList={followersList}
              // updateFollowing={updateFollowing}
              followingHasButton={true}
              followerHasButton={false}
              numberOfRepos={numberOfRepos}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
}
