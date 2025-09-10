// src/components/AdminHrFooter.jsx
import React from "react";

export default function AdminHrFooter() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto shadow-lg">
      <div className="container">
        <p className="mb-1 fw-bold">QuickStart Career - Admin & HR Dashboard</p>
        <p className="small mb-0">
          © {new Date().getFullYear()} QuickStart Career | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
