import styles from "./FollowButton.module.css";
import React from "react";

export default function FollowButton(props) {
  return (
    <div>
      <p>
        <button
          className={`${styles.unfollowbtn} btn btn-sm`}
          onClick={() => props.handleFollow(props.userLogin, props.btnTitle)}
          value={props.btnTitle}
        >
          {props.btnTitle}
        </button>
      </p>
    </div>
  );
}
