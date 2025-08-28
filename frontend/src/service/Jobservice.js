import axios from "axios";
class Jobservice {
  //Jobservice
    addJob(jobData) {
    const token = localStorage.getItem("token");
    return axios.post("http://localhost:8080/AddJob", jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }



   getAllJobs() {
  const token = localStorage.getItem("token");
  return axios.get("http://localhost:8080/allJob", {
    headers: { Authorization: `Bearer ${token}` },
  });
}


    
    contactUs(cont){
      return axios.post("http://localhost:8080/contact",cont ,{
      });
    }


    
// 🔍 Search by Location
searchJobsByLocation(location) {
  const token = localStorage.getItem("token");
  return axios.get(`http://localhost:8080/viewjobbylocation?location=${location}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// 🔍 Search by Title
searchJobsByTitle(title) {
  const token = localStorage.getItem("token");
  return axios.get(`http://localhost:8080/searchByTitle?title=${title}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

 updateJob(jobId, jobData) {
  return axios.put(`http://localhost:8080/updateJob/${jobId}`, jobData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}


// Apply for a Job
// Apply for a Job
applyJob( job_id, seeker_id) {
  const token = localStorage.getItem("token");
  return axios.post(
    "http://localhost:8080/applyedJob",
    {  job_id, seeker_id },   // ✅ send camelCase keys for Node.js
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

getAppliedJobs(seekerId) {
    const token = localStorage.getItem("token"); // optional, if auth required
    return axios.get(`http://localhost:8080/appliedJobs/${seekerId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }



}


export default new Jobservice();