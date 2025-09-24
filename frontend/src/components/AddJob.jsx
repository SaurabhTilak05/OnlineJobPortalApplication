import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Jobservice from "../service/Jobservice.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBuilding, FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaUserGraduate, FaDollarSign, FaTools } from "react-icons/fa";

const locationOptions = ["Mumbai","Pune","Delhi","Bangalore","Chennai","Hyderabad","Kolkata","Ahmedabad"];

export default function AddJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "", company: "", opening: "", experience_required: "",
    location: "", package: "", skills_required: "", description: "", deadline: ""
  });
  const [errors, setErrors] = useState({});
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const validateField = (name, value) => {
    let error = "";
    switch(name){
      case "title": if(!value.trim()) error="Job Title is required"; break;
      case "company": if(!value.trim()) error="Company name is required"; break;
      case "opening": if(!value) error="Openings required"; else if(isNaN(value)||value<=0) error="Must be positive number"; break;
      case "experience_required": if(!value.trim()) error="Experience is required"; break;
      case "location": if(!value.trim()) error="Location is required"; break;
      case "package": if(!value.trim()) error="Package is required"; break;
      case "skills_required": if(!value.trim()) error="Skills required"; break;
      case "description": if(!value.trim()) error="Description required"; else if(value.length<10) error="Min 10 characters"; break;
      case "deadline": 
        if(!value) error="Deadline required"; 
        else { const today=new Date().toISOString().split("T")[0]; if(value<today) error="Cannot select past date"; }
        break;
      default: break;
    }
    return error;
  };

  const handleChange = (e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
    setErrors({...errors,[name]:""});

    if(name==="location"){
      const filtered=locationOptions.filter(loc=>loc.toLowerCase().includes(value.toLowerCase()));
      setLocationSuggestions(filtered);
    }
  };

  const handleBlur = (e)=>{
    const {name,value}=e.target;
    const error=validateField(name,value);
    setErrors({...errors,[name]:error});
    if(name==="location") setTimeout(()=>setLocationSuggestions([]),100);
  };

  const validateAll=()=>{
    const newErrors={};
    Object.keys(formData).forEach(key=>{
      const error=validateField(key,formData[key]);
      if(error) newErrors[key]=error;
    });
    return newErrors;
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newErrors=validateAll();
    if(Object.keys(newErrors).length>0){ setErrors(newErrors); toast.error("⚠️ Fix errors first"); return; }
    try{
      const hrId=localStorage.getItem("hrId");
      if(!hrId){ toast.error("❌ Login as HR to post job"); return; }
      await Jobservice.addJob({...formData, hr_id:Number(hrId)});
      toast.success("✅ Job posted successfully!");
      setFormData({ title:"", company:"", opening:"", experience_required:"", location:"", package:"", skills_required:"", description:"", deadline:"" });
    }catch(err){ console.error(err); toast.error("❌ Failed to post job"); }
  };

  return(
    <div className="container py-5">
      <div className="card shadow-lg rounded-5 p-4 p-md-5 mx-auto bg-white" style={{maxWidth:"950px"}}>
        <h2 className="text-center fw-bold text-primary mb-4">➕ Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-4">

            <div className="col-md-6 position-relative">
              <label className="form-label fw-bold"><FaBriefcase className="me-2"/>Job Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} onBlur={handleBlur} placeholder="Enter job title" className={`form-control shadow-sm ${errors.title?"is-invalid":""}`} />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold"><FaBuilding className="me-2"/>Company</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} onBlur={handleBlur} placeholder="Enter company name" className={`form-control shadow-sm ${errors.company?"is-invalid":""}`} />
              {errors.company && <div className="invalid-feedback">{errors.company}</div>}
            </div>

            <div className="col-md-4">
              <label className="form-label fw-bold"><FaUserGraduate className="me-2"/>Openings</label>
              <input type="number" name="opening" value={formData.opening} onChange={handleChange} onBlur={handleBlur} placeholder="No. of openings" className={`form-control shadow-sm ${errors.opening?"is-invalid":""}`} />
              {errors.opening && <div className="invalid-feedback">{errors.opening}</div>}
            </div>

            <div className="col-md-4">
              <label className="form-label fw-bold"><FaBriefcase className="me-2"/>Experience</label>
              <input type="text" name="experience_required" value={formData.experience_required} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. 2+ years" className={`form-control shadow-sm ${errors.experience_required?"is-invalid":""}`} />
              {errors.experience_required && <div className="invalid-feedback">{errors.experience_required}</div>}
            </div>

            <div className="col-md-4 position-relative">
              <label className="form-label fw-bold"><FaMapMarkerAlt className="me-2"/>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} onBlur={handleBlur} placeholder="Enter job location" className={`form-control shadow-sm ${errors.location?"is-invalid":""}`} autoComplete="off"/>
              {errors.location && <div className="invalid-feedback">{errors.location}</div>}
              {locationSuggestions.length>0 && 
                <ul className="list-group position-absolute w-100 shadow" style={{zIndex:1000,maxHeight:"150px",overflowY:"auto"}}>
                  {locationSuggestions.map((loc,idx)=>(
                    <li key={idx} className="list-group-item list-group-item-action" style={{cursor:"pointer"}} onMouseDown={()=>{setFormData({...formData,location:loc}); setLocationSuggestions([]);}}>{loc}</li>
                  ))}
                </ul>
              }
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold"><FaDollarSign className="me-2"/>Package</label>
              <input type="text" name="package" value={formData.package} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. 6 LPA" className={`form-control shadow-sm ${errors.package?"is-invalid":""}`} />
              {errors.package && <div className="invalid-feedback">{errors.package}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold"><FaTools className="me-2"/>Skills Required</label>
              <input type="text" name="skills_required" value={formData.skills_required} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. React, Java, SQL" className={`form-control shadow-sm ${errors.skills_required?"is-invalid":""}`} />
              {errors.skills_required && <div className="invalid-feedback">{errors.skills_required}</div>}
            </div>

            <div className="col-12">
              <label className="form-label fw-bold"><FaBriefcase className="me-2"/>Job Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} onBlur={handleBlur} rows="4" placeholder="Enter job description" className={`form-control shadow-sm ${errors.description?"is-invalid":""}`} style={{resize:"none"}}/>
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold"><FaCalendarAlt className="me-2"/>Application Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} onBlur={handleBlur} min={new Date().toISOString().split("T")[0]} className={`form-control shadow-sm ${errors.deadline?"is-invalid":""}`} />
              {errors.deadline && <div className="invalid-feedback">{errors.deadline}</div>}
            </div>

          </div>

          <button type="submit" className="btn btn-gradient w-100 fw-bold py-2 mt-4" style={{fontSize:"18px",borderRadius:"10px",background:"linear-gradient(90deg,#007bff,#00c6ff)",color:"#fff",border:"none"}}>➕ Post Job</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}
