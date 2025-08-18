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
};

export default HRService;
