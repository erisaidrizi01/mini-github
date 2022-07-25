import React, { useState } from "react";
import {
  Navbar,
  Container,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import SearchResults from "../SearchResults/SearchResults";
import { useDispatch } from "react-redux/es/exports";
import { getSignOutData } from "../../Pages/SignIn/SignIn.actions";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux/es/exports";
import { useSearchParams } from "react-router-dom";

export default function Navigationbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [typing, setTyping] = useState("");
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const isAuth = localStorage.getItem("token");

  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("tab");

  const handleLogOut = () => {
    dispatch(getSignOutData());
    navigate("/signin");
  };
  const userName = useSelector((state) => state.signin.data.login);

  return (
    <div>
      <Navbar bg="dark" expand="lg" style={{ maxHeight: "50px" }}>
        <Container fluid>
          <Navbar.Collapse
            id="navbarScroll"
            className={`d-flex justify-content-between ${styles.menudrop}`}
          >
            <Container className="d-flex">
              <input
                type="search justify-content-between"
                placeholder="Search"
                className="ms-2 "
                aria-label="Search"
                style={{ width: "22%" }}
                value={typing}
                onChange={(e) => {
                  setTyping(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setInput(typing);
                    setShow(true);
                  }
                }}
              />
              {input && (
                <SearchResults input={input} show={show} setShow={setShow} />
              )}

              {!isAuth && (
                <Button
                  className="pos"
                  variant="outline-primary"
                  onClick={() => {
                    navigate("signin");
                  }}
                  disabled={isAuth}
                >
                  Sign in
                </Button>
              )}
            </Container>
            {isAuth && (
              <div className="pos ">
                <DropdownButton
                  id="dropdown-basic-button new"
                  variant="dark"
                  title="+"
                >
                  <Dropdown.Item
                    onClick={() => {
                      navigate("/newrepository");
                    }}
                  >
                    New repository
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            )}
            {isAuth && (
              <div className="p-5 pos ">
                <DropdownButton id="dropdown-basic-button" title="Go to">
                  <Dropdown.Item
                    onClick={() => {
                      navigate(
                        `/profile/${userName}?tab=${
                          searchVal ? searchVal : "repositories"
                        }`
                      );
                    }}
                  >
                    Your profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
                </DropdownButton>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
