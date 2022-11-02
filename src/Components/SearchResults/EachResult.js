import React from "react";
import styles from "./SearchResults.module.css";
import { useNavigate } from "react-router-dom";

export default function EachResult(props) {
  const navigate = useNavigate();

  return (
    <div className={`${styles.parent}`}>
      <div
        className={`${styles.input} d-flex justify-content-between align-items-center`}
        onClick={() => {
          props.setShow(false);
          navigate(`/profile/${props.login}?tab=repositories`);
        }}
      >
        <div>
          <i className="fa fa-solid fa-user px-2"></i>
          {props.login}
        </div>
        <button className={`${styles.allgithubButton}`}>Jump to</button>
      </div>
    </div>
  );
}
