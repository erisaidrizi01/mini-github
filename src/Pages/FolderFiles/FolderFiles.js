import React from "react";
import { useState, useEffect } from "react";
import { getFolderTree } from "./FolderFiles.actions";
import { Document } from "../../Components/Document/Document";
import { Row, Col, Container } from "react-bootstrap";
// import FolderDocument from "../../../Components/FolderDocument/FolderDocument";
import styles from "../RepoTree/RepositoryTree.module.css";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

export default function FolderFiles() {
  const [folderTree, setFolderTree] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { name, repository, user, path } = useParams();

  useEffect(() => {
    if (folderTree !== [])
      getFolderTree(user, repository, path, setFolderTree, setIsLoading);
  }, [name]);

  return (
    <div>
      <Row className="d-flex justify-content-center">
        <Col>
          <Container className={`${styles.docs}`}>
            <div className="d-flex align-items-center py-3">
              <i className="fa-solid fa-shuttle-space"></i>
              <span className={`${styles.repohead} mx-4`}>
                <b>
                  {user} / {repository} /<span className="name1">{path}</span>
                </b>
              </span>
            </div>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div>
                {folderTree.map((document) => (
                  <Document key={document.sha} document={document} />
                ))}
              </div>
            )}
          </Container>
        </Col>
      </Row>
    </div>
  );
}
