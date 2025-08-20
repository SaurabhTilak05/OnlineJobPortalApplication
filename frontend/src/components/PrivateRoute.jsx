import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // if no token → send to signup page
  if (!token) {
    return <Navigate to="/signup" replace />;
  }

  // if role mismatch → block and redirect
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/signup" replace />;
  }

  return children;
}
