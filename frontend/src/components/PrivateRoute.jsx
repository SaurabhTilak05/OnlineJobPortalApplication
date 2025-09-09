// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRole, children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "admin" | "hr" | "user"

  // Not logged in
  if (!token) {
    return <Navigate to="/signup" replace />;
  }

  // Role not allowed
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // ✅ Support both child and outlet routes
  return children ? children : <Outlet />;
}
