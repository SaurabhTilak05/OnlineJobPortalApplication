import React, { useEffect, useState } from "react";
import AddJObService from "../service/addjobserv.js";

export default function ViewAllJob() {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let promise = AddJObService.getAllJobs(); 
    promise
      .then((result) => {
        setJobs(result.data);
      })
      .catch((err) => {
        setMsg("Failed to fetch jobs");
        console.error(err);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Available Jobs</h2>
      {msg && <div className="alert alert-danger text-center">{msg}</div>}

      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card shadow-lg border-0 rounded-3 h-100">
                <div className="card-body">
                  <h4 className="card-title text-dark">{job.title}</h4>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {job.company} | {job.location}
                  </h6>
                  <p className="card-text">
                    <strong>Openings:</strong> {job.opening} <br />
                    <strong>Experience:</strong> {job.experience_required} yrs <br />
                    <strong>Package:</strong> {job.package} <br />
                    <strong>Skills:</strong> {job.skills_required}
                  </p>
                  <p className="text-secondary">{job.description}</p>
                  <p className="text-danger">
                    <strong>Deadline:</strong> {job.deadline}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No jobs found</p>
        )}
      </div>
    </div>
  );
}
