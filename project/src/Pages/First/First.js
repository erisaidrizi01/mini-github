import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./First.module.css";

export default function First() {
  return (
    <div className="bg=success">
      <Container className={`${styles.bcgImage}`} fluid>
        <Row className={`${styles.pos}`}>
          <Col>
            <h1 className="text-secondary">Welcome to MiniGit</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
