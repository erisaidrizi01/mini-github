import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import MyProfile from "./MyProfile";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import OtherUserProfile from "./OtherUserProfile";

export default function Profile() {
  console.log("Profile");
  const name = useParams();

  const [username, setUsername] = useState("");
  const myUsername = useSelector((state) => state.signin.data.login);

  useEffect(() => {
    if (name.login) {
      setUsername(name.login);
    }
  }, [name]);

  return (
    <div>
      {username && myUsername ? (
        username === myUsername ? (
          <MyProfile />
        ) : (
          <OtherUserProfile />
        )
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
