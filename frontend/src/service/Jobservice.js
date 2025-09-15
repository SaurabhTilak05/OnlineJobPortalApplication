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
  return axios.get("http://localhost:8080/viewAllJobs", {
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


getAppliedJobs(seekerId) {
    const token = localStorage.getItem("token"); // optional, if auth required
    return axios.get(`http://localhost:8080/appliedJobs/${seekerId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }

  deleteJob = (jobId) => {
  return axios.delete(`http://localhost:8080/deleteJob/${jobId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ if using JWT
    },
  });
};

   getApplicantsByJob(jobId) {
  return axios.get(`http://localhost:8080/getapplicant/${jobId}/applicants`);//getapplicant/:id/applicants
}

  // search job for hr by title location company skills 
  searchJobsForHr(hr_id, query = "") {
    return axios.get(
      `http://localhost:8080/searchjobtohr/${hr_id}?query=${query}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  }

  searchJobs(query) {
    return axios.get(`http://localhost:8080/searchJob?query=${query}`);
  }


}


export default new Jobservice();