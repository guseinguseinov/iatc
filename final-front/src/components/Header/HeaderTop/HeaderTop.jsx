import React from "react";
import "./HeaderTop.css";
import { Link } from "react-router-dom";
const HeaderTop = () => {
  return (
    <div className="custom__header__top">
      <div className="container">
        <div className="row">
          <div className="col-9">
            <p className="custom__header__top__p">
              HAVE ANY QUESTION ? +880 5698 598 6587
            </p>
          </div>
          <div className="col-3 custom__header__links">
            <Link className="custom__header__top__link" to="/login">
              Login
            </Link>
            <Link className="custom__header__top__link" to="/register">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
