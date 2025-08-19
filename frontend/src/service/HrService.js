import axios from "axios";

const API_URL = "http://localhost:8080/viewHr";

const HRService = {
  getAllHR: async () => {
    try {
      const res = await axios.get("http://localhost:8080/viewHr");
      return res.data;  // Expecting array of HR objects
    } catch (err) {
      throw err.response?.data || "Failed to fetch HR data";
    }
  },
    deleteHR: async (hr_id) => {
    const res = await axios.delete(`http://localhost:8080/deleteHR/${hr_id}`);
    return res.data;
  }
};

export default HRService;
