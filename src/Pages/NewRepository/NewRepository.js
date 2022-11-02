import React from "react";
import { getNewRepository } from "./NewRepository.actions";
import { useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import styles from "./NewRepository.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NewRepository() {
  const navigate = useNavigate();
  const login = useSelector((state) => state.signin.data.login);
  const [repositoryName, setRepositoryName] = useState("");
  const [description, setDescription] = useState("");
  const [repoType, setRepoType] = useState("true");
  const [showAlert, setShowAlert] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [valid, setValid] = useState("");

  const handleOnChange = (event) => {
    setRepoType(event.target.value);
  };

  const regex = /^[a-z0-9-]+$/i;

  useEffect(() => {
    if (repositoryName) {
      if (regex.test(repositoryName)) {
        setValid("Valid!");
        setDisableBtn(false);
      } else {
        setValid("Not valid!");
        setDisableBtn(true);
      }
    } else {
      setValid("");
      setDisableBtn(true);
    }
  }, [repositoryName]);

  const handleCreateRepo = () => {
    setDisableBtn(true);
    getNewRepository(repositoryName, repoType, description);

    let timer1 = setTimeout(() => setShowAlert(true), 1000);

    const timer = setTimeout(() => {
      navigate(`/profile/${login}?tab=repositories`);
    }, 5 * 1000);
    return () => clearTimeout(timer1, timer);
  };

  return (
    <div>
      <Container className={`${styles.container}`}>
        <Row className="d-flex justify-content-center">
          <Col xs={8}>
            <div className={`${styles.header}`}>
              <h4>Create a new repository</h4>
              <p>
                A repository contains all project files, including the revision
                history.
              </p>
            </div>
            <div className={`${styles.header}`}>
              <div className={` ${styles.sec1} `}>
                <div className={`d-flex `}>
                  <div className={`${styles.owner} d-flex align-items-center`}>
                    <label>
                      Owner <label className={`${styles.red}`}>* </label>
                    </label>

                    <label className=""> {login}</label>
                  </div>
                  <div className="d-flex align-items-center">
                    <label>
                      Repository name
                      <label className={`${styles.red}`}>* </label>{" "}
                    </label>

                    <input
                      value={repositoryName}
                      onChange={(event) =>
                        setRepositoryName(event.target.value)
                      }
                    ></input>
                    <span
                      className={`m-3
                        ${
                          valid
                            ? valid === "Not valid!"
                              ? "text-danger"
                              : "text-success"
                            : null
                        }
                        
                      `}
                    >
                      {valid}
                    </span>
                  </div>
                </div>
                <label className="my-2">
                  Great repository names are short and memorable.
                </label>
              </div>
              <div className="mb-4">
                <label>Description (optional)</label>
                <div>
                  <input
                    className="w-100"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div className={`py-3 ${styles.header}`} onChange={handleOnChange}>
              <div className="d-flex">
                <div className="">
                  <input
                    type="radio"
                    id="public"
                    name="public"
                    value="true"
                    defaultChecked="checked"
                  />
                </div>

                <div className="mx-2">
                  <label htmlFor="public">
                    <b>Public</b>
                  </label>
                  <div>
                    Anyone on the internet can see this repository. You choose
                    who can commit.
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div>
                  <input
                    type="radio"
                    id="private"
                    name="public"
                    value="false"
                    selected
                  />
                </div>
                <div className="mx-2">
                  <label htmlFor="private">
                    <b>Private</b>
                  </label>

                  <div>
                    You choose who can see and commit to this repository.
                  </div>
                </div>
              </div>
            </div>
            <div className={`py-3 ${styles.header}`}>
              <span className="mx-1">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </span>
              You are creating a{" "}
              <b>{repoType === "true" ? "public" : "private"} </b>
              repository in your personal account.
            </div>
            <div className="my-3">
              <Button
                variant="success"
                disabled={!repositoryName || disableBtn || valid === "Valid"}
                onClick={handleCreateRepo}
              >
                Create repository
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col xs={9}>
            {showAlert && (
              <Alert variant="success" className={`${styles.alert}`}>
                You created a new repository!
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
