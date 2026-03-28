import axios from "axios";

const getHrAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("HR login token is missing. Please sign in again.");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

const HRService = {
  getAllHR: async () => {
    try {
      const res = await axios.get("http://localhost:8080/viewHr", {
        headers: getHrAuthHeaders(),
      });
      return res.data; 
    } catch (err) {
      throw err.response?.data || "Failed to fetch HR data";
    }
  },

  
    deleteHR: async (hr_id) => {
    const res = await axios.delete(`http://localhost:8080/deleteHR/${hr_id}`, {
      headers: getHrAuthHeaders(),
    });
    return res.data;
  },


   getHRDetails: async () => {
    try {
      const response = await axios.get("http://localhost:8080/hrprofile", {
        headers: getHrAuthHeaders(),
      });
      const hr = response.data?.hr || {};
      return {
        hr_id: hr.hr_id || localStorage.getItem("hrId") || "",
        hr_name: hr.hr_name || "",
        email: hr.email || "",
        phone: hr.phone || "",
        company_name: hr.company_name || "",
      };
    } catch (error) {
      console.error("Error fetching HR details:", error);
      throw error;
    }
  },

  getRecentJobsByHR: async () => {
  try {
    const response = await axios.get("http://localhost:8080/hr/jobs", {
      headers: getHrAuthHeaders(),
    });
    return response;  // ✅ must return full response, not response.data
  } catch (error) {
    console.error("Error fetching jobs for HR:", error);
    throw error;
  }
},

   updateHRProfile: async (id, hrData) => {
    try {
      const payload = {
        ...hrData,
        hr_id: id || hrData.hr_id || localStorage.getItem("hrId") || "",
      };
      const endpoint = payload.hr_id
        ? `http://localhost:8080/updatehrProfile/${payload.hr_id}`
        : "http://localhost:8080/updatehrProfile";

      const response = await axios.put(endpoint,
        payload,
        {
          headers: {
            ...getHrAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating profile for HR:", error);
      throw error;
    }
  },

};

export default HRService;
