import React from "react";
import { Spinner } from "react-bootstrap";
import { Container } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <Container fluid className="d-flex justify-content-center">
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        className="d-flex justify-content-center"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
}
