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

    


}
export default new AddJObService();