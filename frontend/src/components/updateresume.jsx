import React, { useState } from "react";
import AdminAuthService from "../service/AdminAuthService";
import { toast } from "react-toastify";

export default function ResumeUpload() {
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error("❌ Only PDF, DOC, DOCX files are allowed.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("❌ File size should not exceed 5MB.");
        return;
      }

      setResumeFile(file);
    }
  };

  // ✅ Handle resume upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      toast.warning("⚠️ Please select a resume file first!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      setUploading(true);
      const response = await AdminAuthService.uploadResume(formData); // await response

      if (response && response.message) {
        toast.success("✅ " + response.message); // Show toast after success
      } else {
        toast.success("✅ Resume uploaded successfully!");
      }

      setResumeFile(null);
      e.target.reset();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "❌ Failed to upload resume. Try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow-lg border-0">
            <div className="card-header text-center bg-primary text-white">
              <h3 className="mb-0">Upload Your Resume</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Choose Resume (PDF / DOC / DOCX)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </div>

                {resumeFile && (
                  <div className="alert alert-info py-2">
                    Selected File: <strong>{resumeFile.name}</strong>
                  </div>
                )}

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Uploading...
                      </>
                    ) : (
                      "Upload Resume"
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center text-muted">
              Max file size: 5MB
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
