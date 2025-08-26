// src/components/HRProfile.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HRService from "../service/HrService.js";
import {
  FaUserTie,
  FaEnvelope,
  FaBuilding,
  FaPhone,
  FaEdit,
} from "react-icons/fa";

export default function HRProfile() {
  const [hr, setHR] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hrData = await HRService.getHRDetails();
        setHR(hrData);
      } catch (error) {
        toast.error("Failed to load HR profile data");
      }
    };
    fetchData();
  }, []);

  const handleUpdate = () => {
    toast.info("Update button clicked! (You can open edit modal here)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden">
        {/* Banner Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 p-10 flex flex-col items-center text-center">
          <div className="absolute top-4 right-6">
            <button
              onClick={handleUpdate}
              className="flex items-center gap-2 bg-white text-blue-600 font-medium px-4 py-2 rounded-xl shadow hover:bg-blue-50 transition"
            >
              <FaEdit /> Update
            </button>
          </div>
          <div className="bg-white text-blue-600 rounded-full p-6 shadow-lg">
            <FaUserTie size={80} />
          </div>
          <h2 className="text-2xl font-bold text-white mt-4">
            {hr.hr_name || "HR Name"}
          </h2>
          <p className="text-blue-100">{hr.company_name || "Company Name"}</p>
        </div>

        {/* Content */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Contact Info */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaUserTie className="text-blue-500" />
                <p className="text-gray-800 font-medium">
                  {hr.hr_name || "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />
                <p className="text-gray-800">{hr.email || "N/A"}</p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-500" />
                <p className="text-gray-800">{hr.phone || "N/A"}</p>
              </div>
              <div className="flex items-center gap-3">
                <FaBuilding className="text-blue-500" />
                <p className="text-gray-800">{hr.company_name || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Right: Additional Info */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">
              Additional Information
            </h3>
            <p className="text-gray-600 leading-relaxed">
              You can extend this section to show HR’s{" "}
              <span className="font-semibold">role, department, joining date</span>, 
              or other useful details.  
              <br />
              Example: *Recruitment Specialist, Joined in 2023*.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
