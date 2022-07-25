import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  console.log("mmm", token);
  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};
export default ProtectedRoutes;
