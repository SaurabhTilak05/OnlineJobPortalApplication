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


}
export default new Jobservice();