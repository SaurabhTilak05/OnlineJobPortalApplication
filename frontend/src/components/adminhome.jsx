import React from "react";
import { NavLink } from "react-router-dom"; // ✅ import NavLink
import "bootstrap/dist/css/bootstrap.min.css";

export default function Adminhome() {
  return (
    <div className="admin-page">
      {/* Header */}
      <header className="bg-dark text-white text-center py-3">
        <h2>Admin Page</h2>
      </header>

      <div className="d-flex" style={{ minHeight: "90vh" }}>
        {/* Sidebar */}
        <aside className="bg-light border-end p-3" style={{ width: "250px" }}>
          <NavLink
            to="/addhr"
            className="btn btn-outline-dark w-100 mb-3"
          >
            Add HR
          </NavLink>

          <NavLink
            to="/admin/viewhr"
            className="btn btn-outline-dark w-100 mb-3"
          >
            View HR
          </NavLink>

          <NavLink
            to="/admin/application"
            className="btn btn-outline-dark w-100 mb-3"
          >
            Application
          </NavLink>

          <NavLink
            to="/admin/register-student"
            className="btn btn-outline-dark w-100 mb-3"
          >
            Register Student
          </NavLink>
        </aside>

      
      </div>
    </div>
  );
}
