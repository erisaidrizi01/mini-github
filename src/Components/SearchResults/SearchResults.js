import React from "react";
import styles from "./SearchResults.module.css";
import { useRef, useEffect } from "react";
import { useState } from "react";
import EachResult from "./EachResult";
import { useNavigate } from "react-router-dom";
import { getUsers } from "./SearchResults.actions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";

export default function SearchResults(props) {
  const userName = useSelector((state) => state.signin.data.login);

  function useOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!");
          props.setShow(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getUsers(props.input, setSearchResults, setIsLoading);
  }, [props.input]);

  useOutside(wrapperRef);

  const type = localStorage.getItem("type");

  return (
    <div
      className={props.show ? styles.searchResultsDiv : styles.dontshowdiv}
      ref={wrapperRef}
    >
      {searchResults && (
        <div
          className={`${styles.parent}`}
          onClick={() => {
            props.setShow(false);
            if (type) {
              navigate(`/search?q=${props.input}&type=${type}`);
            } else {
              navigate(`/search?q=${props.input}&type=repositories`);
            }
          }}
        >
          <div
            className={`${styles.input} d-flex justify-content-between align-items-center`}
          >
            <div>
              <i className="fa fa-solid fa-search px-2"></i>
              {props.input}
            </div>
            <button className={`${styles.allgithubButton}`}>all github</button>
          </div>
        </div>
      )}
      <div>
        {userName ? (
          isLoading && !(props.show && searchResults.length !== 0) ? (
            <LoadingSpinner />
          ) : (
            <div>
              {searchResults.length !== 0
                ? searchResults.map(({ login }) => (
                    <EachResult
                      key={login}
                      login={login}
                      setShow={props.setShow}
                    />
                  ))
                : null}
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
