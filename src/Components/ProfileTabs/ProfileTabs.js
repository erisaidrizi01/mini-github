import React, { useEffect } from "react";
import Repositories from "../../Pages/Profile/Repositories";
import { Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Starred from "../../Pages/Profile/Starred";
import { useSearchParams } from "react-router-dom";
import Followers from "../../Pages/Profile/Followers";
import Following from "../../Pages/Profile/Following";

export default function ProfileTabs(props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const tabs = ["repositories", "starred", "followers", "following"];
  const [selectedTab, setSelectedTab] = useState(
    tabs.includes(tab) ? tab : "repositories"
  );

  useEffect(() => {
    setSelectedTab(tabs.includes(tab) ? tab : "repositories");
  }, [tab]);

  return (
    <div>
      <Tabs
        activeKey={selectedTab}
        defaultActiveKey={selectedTab}
        id="uncontrolled-tab-example"
        className="mb-3"
        onSelect={(eventKey) => {
          navigate(`/profile/${props.login}?tab=${eventKey}`);
          setSelectedTab(eventKey);
        }}
      >
        <Tab
          eventKey="repositories"
          title={<React.Fragment>Repositories</React.Fragment>}
        >
          {selectedTab === "repositories" && (
            <Repositories
              numberOfRepos={props.numberOfRepos}
              reposUrl={props.reposUrl}
            />
          )}
        </Tab>
        <Tab eventKey="starred" title="Starred repositories">
          {selectedTab === "starred" && (
            <Starred starredReposUrl={props.starredReposUrl} />
          )}
        </Tab>
        <Tab
          eventKey="followers"
          title={<React.Fragment>Followers</React.Fragment>}
        >
          <div>
            {selectedTab === "followers" && (
              <Followers
                hasButton={props.followerHasButton}
                numberOfFollowers={props.numberOfFollowers}
                followersUrl={props.followersUrl}
              />
            )}
          </div>
        </Tab>
        <Tab
          eventKey="following"
          title={<React.Fragment>Following</React.Fragment>}
        >
          <div>
            {selectedTab === "following" && (
              <Following
                hasButton={props.followingHasButton}
                followingListUrl={props.followingListUrl}
                numberOfFollowing={props.numberOfFollowing}
              />
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
