import React from "react";
import { useState, useEffect } from "react";
import { getRepoDefault_branch } from "./RepositoryTree.actions";
import { getAuthRepoTree } from "./RepositoryTree.actions";
import { Container, Row, Col } from "react-bootstrap";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import styles from "./RepositoryTree.module.css";
import { Document } from "../../Components/Document/Document";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import PageNotFound from "../PageNotFound/PageNotFound";
import { useParams } from "react-router-dom";

export default function RepositoryTree() {
  const navigate = useNavigate();
  const { login, name } = useParams();
  const [found, setFound] = useState(false);
  const [defaultBranch, setDefaultBranch] = useState("");
  const [repositoryTree, setRepositoryTree] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRepoDefault_branch(
      login,
      name,
      setDefaultBranch,
      setFound,
      setIsLoading
    );
  }, [login, name, setDefaultBranch]);

  useEffect(() => {
    if (defaultBranch !== "") {
      getAuthRepoTree(
        login,
        name,
        defaultBranch,
        setRepositoryTree,
        setError,
        setIsLoading
      );
    }
  }, [defaultBranch]);
  const profileLogin = useSelector((state) => state.signin.data.login);
  console.log("po provoj found", found);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : found ? (
        <Row className="d-flex justify-content-center">
          <Col xs={8}>
            {error ===
              "Cannot read properties of undefined (reading 'data')" && (
              <Container className={`${styles.docs}`}>
                <div className="d-flex align-items-center py-3 d-flex justify-content-between">
                  <span>
                    <i className="fa-solid fa-shuttle-space"></i>
                    <span className={`${styles.repohead} mx-4`}>
                      <b>
                        {login} /<span className="name1">{name}</span>
                      </b>
                    </span>
                  </span>
                  {profileLogin !== undefined && login === profileLogin ? (
                    <div>
                      <button
                        className={`settingsbtn btn btn-sm`}
                        onClick={() =>
                          navigate(`/${login}/repository/${name}/settings`)
                        }
                      >
                        <i className="fa fa-gear mx-1"></i>Settings
                      </button>
                    </div>
                  ) : null}
                </div>
                <div>
                  <h3>This repository has no documents!</h3>
                </div>
              </Container>
            )}
            {repositoryTree.length !== 0 && error === "" && (
              <Container className={`${styles.docs}`}>
                <div className="d-flex align-items-center py-3">
                  <i className="fa-solid fa-shuttle-space"></i>
                  <span className={`${styles.repohead} mx-4`}>
                    <b>
                      {login} /<span className="name1">{name}</span>
                    </b>
                  </span>
                </div>
                <div>
                  {repositoryTree.map((document) => (
                    <Document
                      key={document.sha}
                      document={document}
                      user={login}
                      repository={name}
                      defaultBranch={defaultBranch}
                    />
                  ))}
                </div>
              </Container>
            )}
          </Col>
        </Row>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
}
