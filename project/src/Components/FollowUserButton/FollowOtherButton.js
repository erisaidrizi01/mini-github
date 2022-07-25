import styles from "./FollowOtherButton.module.css";
import React from "react";

export default function FollowOtherButton(props) {
  console.log("butoniii", props.btnTitle);
  return (
    <div>
      <button
        className={`${styles.unfollowbtn} btn btn-sm`}
        onClick={() => props.handleFollow(props.userLogin, props.btnTitle)}
        value={props.btnTitle}
      >
        {props.btnTitle}
      </button>
    </div>
  );
}
