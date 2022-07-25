import { Container, Row, Col, Alert } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.css";
import { deleteRepository } from "./Settings.actions";
import { useState } from "react";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";

export default function Delete(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [disableBtn, setDisableBtn] = useState(false);
  const userName = useSelector((state) => state.signin.data.login);

  const handleDeleteRepository = () => {
    deleteRepository(props.login, props.name, setIsLoading);
    setDisableBtn(true);
    let timer = setTimeout(() => setShowAlert(true), 1);
    const timer1 = setTimeout(() => {
      navigate(`/profile/${userName}`);
    }, 5 * 1000);
    return () => clearTimeout(timer, timer1);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <Row
            className={`d-flex align-items-center justify-content-center my-4`}
          >
            <Col
              xs={9}
              className={`${styles.settings} d-flex align-items-center justify-content-between py-3`}
            >
              <div className={`mx-3`}>
                <span>
                  <b>
                    Delete <span className="name1">`{props.name}`</span>{" "}
                    repository
                  </b>
                </span>
                <p>
                  Once you delete a repository, there is no going back. Please
                  be certain.
                </p>
              </div>
              <button
                className={`${styles.deletebtn} btn btn-sm mx-4`}
                onClick={handleDeleteRepository}
                disabled={disableBtn}
              >
                Delete this repository
              </button>
            </Col>
          </Row>
          <Row
            className={`d-flex align-items-center justify-content-center my-4`}
          >
            <Col xs={9}>
              {showAlert && (
                <Alert variant="danger" className={`${styles.alert}`}>
                  You deleted a repository!
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
