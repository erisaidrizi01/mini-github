import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SingleStarred.module.css";
import { useState, useEffect } from "react";

export default function SingleStarred(props) {
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const { language, name, stargazers_count, updated_at } = props.singleStarred;
  const { login } = props.singleStarred.owner;

  useEffect(() => {
    if (updated_at) {
      setDate(new Date(updated_at).toLocaleString());
    }
  }, [updated_at]);

  return (
    <div className={`d-flex px-0 ${styles.starredContainer}`}>
      <div className={`flex-auto`}>
        <div className="d-flex mbottom">
          <p
            className="login"
            onClick={() =>
              navigate(`/${props.singleStarred.owner.login}/repository/${name}`)
            }
          >
            {name} /<span className="name1">{login}</span>
          </p>
        </div>

        <div
          className={`d-flex lastsec px-3 mt-2 mb-3 justify-content-between `}
        >
          <span className={`${styles.textsize}`}>
            <i className="fa fa-solid fa-star" aria-hidden="true"></i>
            {stargazers_count}
          </span>
          <span className={`px-3 ${styles.textsize}`}>
            <i className="fa fa-solid fa-circle" aria-hidden="true"></i>
            {language ? language : null}
          </span>

          <span className={`${styles.textsize}`}>Updated: {date && date}</span>
        </div>
      </div>
    </div>
  );
}
