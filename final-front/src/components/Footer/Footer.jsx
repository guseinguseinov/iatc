import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer className="footer-area">
        <div className="main-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="single-widget pr-60">
                  <div className="footer-logo pb-25">
                    <a href="index-2.html">
                      <img
                        src="https://htmldemo.net/eduhome/eduhome/img/logo/footer-logo.png"
                        alt="eduhome"
                      />
                    </a>
                  </div>
                  <p>
                    I must explain to you how all this mistaken idea of denoung
                    pleure and praising pain was born and give you a coete
                    account of the system.{" "}
                  </p>
                  <div className="footer-social">
                    <ul>
                      <li>
                        <Link to="/">
                          <i className="fa-brands fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa-brands fa-pinterest-p"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa-brands fa-vimeo-v"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa-brands fa-twitter"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="single-widget">
                  <h3>information</h3>
                  <ul>
                    <li>
                      <Link to="/">addmission</Link>
                    </li>
                    <li>
                      <Link to="/">Academic Calender</Link>
                    </li>
                    <li>
                      <Link to="/">Event List</Link>
                    </li>
                    <li>
                      <Link to="/">Hostel &amp; Dinning</Link>
                    </li>
                    <li>
                      <Link to="/">TimeTable</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2 col-sm-6 col-xs-12">
                <div className="single-widget">
                  <h3>useful links</h3>
                  <ul>
                    <li>
                      <Link to="/">our courses</Link>
                    </li>
                    <li>
                      <a href="about.html">about us</a>
                    </li>
                    <li>
                      <a href="teacher.html">teachers &amp; faculty</a>
                    </li>
                    <li>
                      <Link to="/">teams &amp; conditions</Link>
                    </li>
                    <li>
                      <a href="event.html">our events</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="single-widget">
                  <h3>get in touch</h3>
                  <p>
                    Your address goes here, Street
                    <br />
                    City, Roadno 785 New York
                  </p>
                  <p>
                    +880 548 986 898 87
                    <br />
                    +880 659 785 658 98
                  </p>
                  <p>
                    info@eduhome.com
                    <br />
                    www.eduhome.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <p>
                  Copyright © <Link to="/">HasTech</Link> 2017. All Right
                  Reserved By Hastech.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
