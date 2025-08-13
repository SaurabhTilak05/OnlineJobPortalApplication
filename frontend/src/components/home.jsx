import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import "./home.css";

class Home extends React.Component {
  render() {
    return (
      <>
        <section className="py-5 text-center bg-light">
          <div className="container">
           
            <h1 className="fw-bold">
              Your dream Job <br />
              <span className="text-danger">Is Near to You</span>
            </h1>
          </div>
        </section>


       <div className="midimage">

       </div>

        
        <footer className="bg-dark text-light py-5 mt-5">
          <div className="container">
            <div className="row">
              
              <div className="col-md-3 mb-4">
                <h5>Job Portal</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore accumsan lacus vel facilisis.
                </p>
              </div>
              
              <div className="col-md-3 mb-4">
                <h5>Useful Links</h5>
                <ul className="list-unstyled">
                  <li>About Us</li>
                  <li>Contact Us</li>
                  <li>Services</li>
                  <li>News & Blog</li>
                  <li>Our Features</li>
                </ul>
              </div>
              
              <div className="col-md-3 mb-4">
                <h5>Contact Us</h5>
                <p>456, Tredy Road, New York, USA, MD 210093</p>
                <p>hr@gmail.com</p>
                <p>+61-5869259325</p>
              </div>
             
              <div className="col-md-3 mb-4">
                <h5>Get In Touch</h5>
                <input type="email" className="form-control" placeholder="E-mail Address" />
                <div className="mt-2">
                  <i className="bi bi-facebook me-2"></i>
                  <i className="bi bi-twitter me-2"></i>
                  <i className="bi bi-instagram me-2"></i>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default Home;
