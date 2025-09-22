const BASE_URL = "http://localhost:8080";

export const getAllPlacements = async (hrId) => {
  try {
    const res = await fetch(`${BASE_URL}/place?hrId=${hrId}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching placements:", err);
    throw err;
  }

};


/**
 * Fetch all placements for Admin
 * Optional: you can pass page and limit for server-side pagination later
 */
export const getPlacements = async () => {
  try {
    const res = await fetch(`${BASE_URL}/admin/placements`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    // If you implement server-side pagination, you may want to return data.placements and data.pagination separately
    return data.placements || data; 
  } catch (err) {
    console.error("Error fetching placements:", err);
    throw err;
  }
};
