import React from "react";
import { Navigate } from "react-router-dom";
import AdminAuthService from "../service/AdminAuthService.js";

const PrivateRoute = ({ children, role }) => {
  const isAuth = AdminAuthService.isAuthenticated();
  const userRole = AdminAuthService.getRole();

  console.log("PrivateRoute:", isAuth, userRole, role); // Debug

  if (!isAuth || userRole.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/signup" />; // redirect to login if unauthorized
  }

  return children;
};

export default PrivateRoute;
