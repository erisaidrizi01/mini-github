import React from "react";
import styles from "./Document.module.css";
import { useNavigate } from "react-router-dom";

export const Document = (props) => {
  const { path, mode } = props.document;
  console.log("path", path);
  // console.log("mode", mode);

  const user = props.user;
  const repository = props.repository;
  const name = props.document.name;
  const type = props.document.type;
  console.log("type", type, "name", name);
  const navigate = useNavigate();

  return (
    <div className={`${styles.path} py-2`}>
      <span className="px-2">
        {mode === "040000" || type === "dir" ? (
          <i
            className=" fa fa-solid fa-folder icon-4x"
            style={{ color: "#54aeff" }}
          />
        ) : (
          <i
            className="fa fa-solid fa-file"
            style={{ color: "rgb(82 85 89 / 25%)" }}
          />
        )}
      </span>

      <span
        className={`${styles.visit} cursor-pointer px-2 `}
        style={{
          color: mode === "040000" || type === "dir" ? "#54aeff" : "#077542",
        }}
        onClick={() => {
          if (mode === "100644") {
            props.defaultBranch === "main"
              ? navigate(`/${user}/repository/${repository}/tree/main/${path}`)
              : navigate(
                  `/${user}/repository/${repository}/tree/master/${path}`
                );
          }
          if (mode === "040000" || type === "dir") {
            props.defaultBranch === "main"
              ? navigate(`/${user}/repository/${repository}/${path}`)
              : navigate(`/${user}/repository/${repository}/${path}`);
          }
        }}
      >
        {name ? name : path}
      </span>
    </div>
  );
};

// onClick={() =>
//   props.defaultBranch === "main"
//     ? navigate(`/${user}/${repository}/tree/main/${path}`)
//     : navigate(`/${user}/${repository}/tree/master/${path}`)
// }
