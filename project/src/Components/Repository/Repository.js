import React, { useEffect } from "react";
import "./Repository.css";
import Badge from "react-bootstrap/esm/Badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Repository(props) {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const {
    description,
    language,
    license,
    name,
    stargazers_count,
    topics,
    updated_at,
  } = props.repo;

  useEffect(() => {
    if (updated_at) {
      setDate(new Date(updated_at).toLocaleString());
    }
  }, [updated_at]);

  return (
    <div className="d-flex px-0">
      <div className="flex-shrink-0 mr-2">
        <i className="fa fa-solid fa-shuttle-space"></i>
      </div>
      <div className="flex-auto">
        <div className="d-flex mbottom">
          <p
            className="login"
            onClick={() =>
              navigate(`/${props.repo.owner.login}/repository/${name}`)
            }
          >
            {props.repo.owner.login} /<span className="name1">{name}</span>
          </p>
        </div>
        <div>
          <p className="description px-3 mt-0 mb-1">{description}</p>
        </div>
        <div className="px-3">
          {topics.map((topic) => (
            <Badge pill bg="primary" className="mx-1">
              {topic}
            </Badge>
          ))}
        </div>
        <div className="d-flex lastsec px-3 mt-2 mb-3 justify-content-between">
          <span>
            <i className="fa fa-solid fa-star" aria-hidden="true"></i>
            {stargazers_count}
          </span>
          <span>{language}</span>
          <span>{!license ? "null" : license.name}</span>

          <span>Updated: {date && date}</span>
        </div>
      </div>
    </div>
  );
}
