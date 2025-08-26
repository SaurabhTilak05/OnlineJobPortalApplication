import axios from "axios";
class AddJObService {
  //
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


    AddHR(hrdata){
      return axios.post("http://localhost:8080/AddHr",hrdata,{

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


}
export default new AddJObService();