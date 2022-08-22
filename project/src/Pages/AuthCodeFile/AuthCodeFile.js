import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { getCodeFile } from "./AuthCodeFile.actions";
import { useState } from "react";
import styles from "../../Pages/CodeFile/CodeFile.module.css";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { useParams } from "react-router-dom";

export default function AuthCodeFile() {
  const { user, repository, path } = useParams();
  console.log("repo", repository);

  const [code, setCode] = useState("");
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(getCodeFile(user, repository, path, setCode, setIsLoading));
  });

  const newCode = code
    .slice(1, -1)
    .split("\\n")
    .map((line, i) => (
      <p key={i}>
        {line}
        <br />
      </p>
    ));

  console.log("newCode", newCode);

  return (
    <Row className={`my-5 d-flex justify-content-center `}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Col xs={6}>
          <div className={`${styles.file} p-4`}>
            {/* <div className={`${styles.fileName}`}>file Name</div> */}
            <div className={`${styles.code}`}>{newCode}</div>
          </div>
        </Col>
      )}
    </Row>
  );
}
