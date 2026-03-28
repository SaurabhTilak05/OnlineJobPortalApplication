import React, { useRef, useState } from "react";
import AdminAuthService from "../service/AdminAuthService";
import { toast } from "react-toastify";
import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaFileAlt,
  FaShieldAlt,
} from "react-icons/fa";
import "./updateresume.css";

export default function ResumeUpload() {
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setResumeFile(null);
      setStatusType("error");
      setStatusMessage("Only PDF, DOC, DOCX files are allowed.");
      toast.error("Only PDF, DOC, DOCX files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setResumeFile(null);
      setStatusType("error");
      setStatusMessage("File size should not exceed 5MB.");
      toast.error("File size should not exceed 5MB.");
      return;
    }

    setResumeFile(file);
    setStatusMessage("");
    setStatusType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setStatusType("error");
      setStatusMessage("Please select a resume file first.");
      toast.warning("Please select a resume file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      setUploading(true);
      setStatusMessage("");
      setStatusType("");

      const response = await AdminAuthService.uploadResume(formData);
      const successMessage = response?.message || "Resume uploaded successfully!";

      toast.success(successMessage);
      setStatusType("success");
      setStatusMessage(successMessage);
      setResumeFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to upload resume. Try again.";

      toast.error(errorMessage);
      setStatusType("error");
      setStatusMessage(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="resume-upload-page">
      <section className="resume-upload-hero">
        <div className="resume-upload-hero-copy">
          <span className="resume-upload-kicker">Resume Center</span>
          <h1>Upload a polished resume that is ready for your next application.</h1>
          <p>
            Keep your latest resume available in one place so you can apply faster and present the most
            current version of your experience to recruiters.
          </p>
          <div className="resume-upload-tags">
            <span>Accepted: PDF, DOC, DOCX</span>
            <span>Maximum file size: 5MB</span>
          </div>
        </div>

        <aside className="resume-upload-hero-panel">
          <span className="resume-upload-panel-label">Best practice</span>
          <strong>Use your latest, role-focused resume.</strong>
          <p>Keep your projects, internships, certifications, and skills updated before uploading.</p>
        </aside>
      </section>

      <section className="resume-upload-grid">
        <article className="resume-upload-panel">
          <div className="resume-upload-section-head">
            <h2>Upload your resume</h2>
            <p>Select a valid file and save it to your student profile.</p>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="resume-upload-form">
            <label className="resume-upload-dropzone">
              <div className="resume-upload-dropzone-icon">
                <FaCloudUploadAlt />
              </div>
              <div className="resume-upload-dropzone-copy">
                <strong>{resumeFile ? resumeFile.name : "Choose resume file"}</strong>
                <span>Click to browse your PDF, DOC, or DOCX file</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </label>

            {resumeFile && (
              <div className="resume-upload-file-chip">
                <FaFileAlt />
                <span>{resumeFile.name}</span>
              </div>
            )}

            {statusMessage && (
              <div className={`resume-upload-alert ${statusType === "success" ? "success" : "error"}`}>
                {statusMessage}
              </div>
            )}

            <button
              type="submit"
              className="btn resume-upload-primary-btn"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Resume"}
            </button>
          </form>
        </article>

        <article className="resume-upload-panel resume-upload-info-panel">
          <div className="resume-upload-section-head">
            <h2>Upload guidelines</h2>
            <p>Make sure your file is recruiter-ready before saving it.</p>
          </div>

          <div className="resume-upload-guidelines">
            <div className="resume-upload-guideline">
              <span className="resume-upload-guideline-icon"><FaCheckCircle /></span>
              <div>
                <strong>Use a clear format</strong>
                <p>Keep headings, sections, and project details easy to scan quickly.</p>
              </div>
            </div>

            <div className="resume-upload-guideline">
              <span className="resume-upload-guideline-icon"><FaShieldAlt /></span>
              <div>
                <strong>Stay within limits</strong>
                <p>Only PDF, DOC, and DOCX files are accepted, with a maximum size of 5MB.</p>
              </div>
            </div>

            <div className="resume-upload-guideline">
              <span className="resume-upload-guideline-icon"><FaFileAlt /></span>
              <div>
                <strong>Keep it updated</strong>
                <p>Refresh your resume whenever you add new skills, internships, or projects.</p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
