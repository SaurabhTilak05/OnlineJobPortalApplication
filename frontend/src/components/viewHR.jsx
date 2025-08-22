import React, { useEffect, useState } from "react";
import HRService from "../service/HrService.js";

export default function ViewHR() {
  const [hrList, setHrList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadHRs();
  }, []);

  const loadHRs = async () => {
    try {
      setLoading(true);
      const data = await HRService.getAllHR();
      setHrList(data);
    } catch (err) {
      setError("Failed to fetch HR data.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete HR by id
  const deleteHR = async (id) => {
    if (!window.confirm("Are you sure you want to delete this HR?"))
      {
        Navigate("/ViewHR");
      } ;

    try {
      await HRService.deleteHR(id);
      setHrList(hrList.filter((hr) => hr.hr_id !== id));
    } catch (err) {
      alert("Failed to delete HR");
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-4 text-primary">
          👥 All HRs
        </h2>

        {loading && <p className="text-center text-muted">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {!loading && !error && (
          <>
            {/* Table for large screens */}
            <div className="table-responsive d-none d-md-block">
              <table className="table table-hover table-striped shadow-sm rounded-3 overflow-hidden">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Sr.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Company</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hrList.length > 0 ? (
                    hrList.map((hr,index) => (
                      <tr key={hr.hr_id}>
                        <td>{index+1}</td>
                        <td>{hr.hr_name}</td>
                        <td>{hr.email}</td>
                        <td>{hr.company_name}</td>
                        <td>{hr.phone}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteHR(hr.hr_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No HRs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Card Layout for Mobile Screens */}
            <div className="d-md-none">
              {hrList.length > 0 ? (
                hrList.map((hr) => (
                  <div
                    key={hr.hr_id}
                    className="card mb-3 shadow-sm border-0 rounded-3"
                  >
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-primary">
                        {hr.hr_name}
                      </h5>
                      <p className="card-text mb-1">
                        <strong>Email:</strong> {hr.email}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Company:</strong> {hr.company_name}
                      </p>
                      <p className="card-text">
                        <strong>Contact:</strong> {hr.phone}
                      </p>
                      <button
                        className="btn btn-sm btn-danger mt-2"
                        onClick={() => deleteHR(hr.hr_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No HRs found</p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
