import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import styles from "./SignIn.module.css";
import { useState } from "react";
import { getSignInData } from "./SignIn.actions";
import { useDispatch } from "react-redux";
// import { clearUserData } from "./SignIn.actions";
import { useSelector } from "react-redux/es/exports";

export default function SignIn() {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignInClick = (e) => {
    e.preventDefault();
    try {
      console.log("u klikova");

      setError("");
      dispatch(getSignInData(password));
    } catch (error) {
      setError(error);
    }
    setError("");
    setPassword("");
  };

  const err = useSelector((state) => state.signin.error);

  const handleError = () => {
    setError(err);
  };

  useEffect(() => {
    handleError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSignInClick]);

  return (
    <div className={`${styles.bcgImage}`}>
      <div className={`${styles.card}`}>
        <Card className={`m-auto ${styles.t}`}>
          <form className="px-5 py-3">
            <div className="mb-3">
              <label className="my-2">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span className="err ? error : null">{error}</span>
            </div>
            <div className="d-grid">
              <button
                // type='submit'
                className="btn btn-primary"
                disabled={!password}
                onClick={handleSignInClick}
              >
                Sign In
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
