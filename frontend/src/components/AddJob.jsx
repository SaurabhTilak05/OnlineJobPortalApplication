import React from "react";
import ReactDom from "react-dom";
import AddJObService from "../servise/addjobserv.js";

export default class AddJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hr_id: "",
      title: "",
      company: "",
      opening: "",
      experience_required: "",
      location: "",
      package: "",
      skills_required: "",
      description: "",
      deadline: "",
      msg:""
    };
  }

  addingjob = () => {
  let promise = AddJObService.addJob(this.state);
  promise
    .then((result) => {
      console.log(result);
      this.setState({
        msg: result.data.message,
        hr_id: "",
        title: "",
        company: "",
        opening: "",
        experience_required: "",
        location: "",
        package: "",
        skills_required: "",
        description: "",
        deadline: ""
      });
    })
    .catch((err) => {
      this.setState({ msg: "Failed to save job" });
      console.error(err);
    });
};

  render() {
    return (
        <>
          <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4 shadow-lg bg-light w-100" style={{ maxWidth: "700px" }} >
               {this.state.msg && (
                <div className="form-group mt-3">
                  <div className="alert alert-info text-center">
                    {this.state.msg}
                  </div>
                </div>
              )}
              <h2 className="text-center mb-4 text-primary">Add Job</h2>

              <div className="form-group mb-3">
                <label>HR ID</label>
                <input type="text" name="hr_id" className="form-control" value={this.state.hr_id} onChange={(e) => this.setState({ hr_id: e.target.value })} placeholder="Enter HR ID" />
              </div>

              <div className="form-group mb-3">
                <label>Job Title</label>
                <input type="text" name="title" className="form-control" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} placeholder="Enter Job Title"/>
              </div>

              <div className="form-group mb-3">
                <label>Company</label>
                <input type="text"  name="company"  className="form-control"  value={this.state.company}  onChange={(e) => this.setState({ company: e.target.value })} placeholder="Enter Company Name" />
              </div>

              <div className="form-group mb-3">
                <label>Openings</label>
                <input type="text" name="opening" className="form-control" value={this.state.opening} onChange={(e) => this.setState({ opening: e.target.value })} placeholder="Number of Openings"
                />
              </div>

              <div className="form-group mb-3">
                <label>Experience Required</label>
                <input  type="text" name="experience_required" className="form-control" value={this.state.experience_required} onChange={(e) => this.setState({ experience_required: e.target.value }) } placeholder="Years of Experience Required"/>
              </div>

              <div className="form-group mb-3">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={this.state.location}
                  onChange={(e) => this.setState({ location: e.target.value })}
                  placeholder="Job Location"
                />
              </div>

              <div className="form-group mb-3">
                <label>Package</label>
                <input
                  type="text"
                  name="package"
                  className="form-control"
                  value={this.state.package}
                  onChange={(e) => this.setState({ package: e.target.value })}
                  placeholder="CTC / Package"
                />
              </div>

              <div className="form-group mb-3">
                <label>Skills Required</label>
                <input
                  type="text"
                  name="skills_required"
                  className="form-control"
                  value={this.state.skills_required}
                  onChange={(e) =>
                    this.setState({ skills_required: e.target.value })
                  }
                  placeholder="Skills (comma separated)"
                />
              </div>

              <div className="form-group mb-3">
                <label>Job Description</label>
                <textarea name="description" className="form-control" rows="4" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })  } placeholder="Enter detailed job description" ></textarea>
              </div>

              <div className="form-group mb-4">
                <label>Application Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  className="form-control"
                  value={this.state.deadline}
                  onChange={(e) => this.setState({ deadline: e.target.value })}
                />
              </div>
               <button type="submit" className="btn btn-primary w-100" onClick={this.addingjob}>Add Job</button>
            </div>
          </div>
       
      </>
    );
  }
}
