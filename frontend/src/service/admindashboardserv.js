// src/service/AdminDashboardService.js

const BASE_URL = "http://localhost:8080/count";

const AdminDashboardService = {
  getHRCount: async () => {
    const res = await fetch(`${BASE_URL}/hr`);
    if (!res.ok) throw new Error("Failed to fetch HR count");
    return res.json();
  },

  getStudentCount: async () => {
    const res = await fetch(`${BASE_URL}/students`);
    if (!res.ok) throw new Error("Failed to fetch student count");
    return res.json();
  },

  getApplicationCount: async () => {
    const res = await fetch(`${BASE_URL}/applications`);
    if (!res.ok) throw new Error("Failed to fetch application count");
    return res.json();
  },

  // helper for all counts together
  getAllCounts: async () => {
    const [hr, students, applications] = await Promise.all([
      AdminDashboardService.getHRCount(),
      AdminDashboardService.getStudentCount(),
      AdminDashboardService.getApplicationCount(),
    ]);
    return {
      hrs: hr.total || 0,
      students: students.total || 0,
      applications: applications.total || 0,
    };
  },
};

export default AdminDashboardService;
