import axios from "axios";


const HRService = {
  getAllHR: async () => {
    try {
      const res = await axios.get("http://localhost:8080/viewHr");
      return res.data; 
    } catch (err) {
      throw err.response?.data || "Failed to fetch HR data";
    }
  },

  
    deleteHR: async (hr_id) => {
    const res = await axios.delete(`http://localhost:8080/deleteHR/${hr_id}`);
    return res.data;
  },


   getHRDetails: async () => {
    try {
      const response = await axios.get("http://localhost:8080/hrprofile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // your JWT
        },
      });
      return response.data.hr; // because backend returns { message, hr }
    } catch (error) {
      console.error("Error fetching HR details:", error);
      throw error;
    }
  },

  getRecentJobsByHR: async () => {
  try {
    const response = await axios.get("http://localhost:8080/hr/jobs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;  // ✅ must return full response, not response.data
  } catch (error) {
    console.error("Error fetching jobs for HR:", error);
    throw error;
  }
},

   updateHRProfile: async (id, hrData) => {
    try {
      const token = localStorage.getItem("token"); // get JWT
      const response = await axios.put(`http://localhost:8080/updatehrProfile/${id}`,
        hrData,
        {
          headers: {
            Authorization: `Bearer ${token}`, //  Important
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
