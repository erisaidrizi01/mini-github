import { Tab, Row, Col, Nav, Container } from "react-bootstrap";
import UserResults from "./UserResults";
import ReposResults from "./ReposResults";
import styles from "./AllSearchResults.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AllSearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("q");

  const [searchType] = useSearchParams();
  const type = searchType.get("type");
  const types = ["users", "repositories"];
  const [selectedType, setSelectedType] = useState(
    types.includes(type) ? type : "users"
  );

  useEffect(() => {
    localStorage.setItem("type", selectedType);
  }, [selectedType]);

  return (
    <Container className={styles.searchResults} fluid>
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey={selectedType}
        onSelect={(eventKey) => {
          navigate(`/search?q=${searchVal}&type=${eventKey}`);
          setSelectedType(eventKey);
        }}
      >
        <Row className="d-flex justify-content-center">
          <Col sm={2} className="pt-5">
            <Nav variant="pills" className="flex-column border rounded">
              <Nav.Item>
                <Nav.Link className={"cursor-pointer"} eventKey="repositories">
                  Repositories
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={"cursor-pointer"} eventKey="users">
                  Users
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={5} className="pt-4">
            <Tab.Content>
              <Tab.Pane eventKey="users">
                {selectedType === "users" && <UserResults />}
              </Tab.Pane>
              <Tab.Pane eventKey="repositories">
                {selectedType === "repositories" && <ReposResults />}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
