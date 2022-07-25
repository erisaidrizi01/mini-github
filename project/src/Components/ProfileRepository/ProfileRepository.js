import React from "react";
import "../../Pages/Profile/Repositories.css";
import { useNavigate } from "react-router-dom";

export default function ProfileRepository(props) {
  const navigate = useNavigate();
  const {
    description,
    forks_count,
    language,
    name,
    stargazers_count,
  } = props.repository;

  return (
    <div>
      <div className="repo">
        <div
          onClick={() =>
            navigate(`/${props.repository.owner.login}/repository/${name}`)
          }
        >
          <div className="title">
            <i className="fa fa-shuttle-space pr-1 mx-1" />
            <span>{name}</span>
          </div>
          <span className="description">{description}</span>
        </div>
        <div className="d-flex">
          <div className="subitem">
            <i className="fa fa-code pr-1" />
            <span>{language}</span>
          </div>
          <div className="subitem">
            <i className="fa fa-star pr-1" />
            <span>{stargazers_count}</span>
          </div>
          <div className="subitem">
            <i className="fa fa-code-fork pr-1" />
            <span>{forks_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
