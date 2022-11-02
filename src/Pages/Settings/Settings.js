import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { findRepo } from "../RepoTree/RepositoryTree.actions";
import { useEffect } from "react";
import Delete from "./Delete";
import PageNotFound from "../PageNotFound/PageNotFound";

export const Settings = () => {
  const { login, name } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [found, setFound] = useState("");
  console.log("hyra");

  useEffect(() => {
    findRepo(login, name, setIsLoading, setFound);
  }, [name]);

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner />
      ) : found ? (
        <Delete name={name} login={login} />
      ) : (
        <PageNotFound />
      )}
    </Container>
  );
};
