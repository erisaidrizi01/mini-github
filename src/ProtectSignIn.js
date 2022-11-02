import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectSignIn = ({ userName }) => {
  const token = localStorage.getItem("token");

  return !token ? (
    <Outlet />
  ) : (
    <Navigate to={`/profile/${userName}/?tab=repositories`} replace />
  );
};
export default ProtectSignIn;
