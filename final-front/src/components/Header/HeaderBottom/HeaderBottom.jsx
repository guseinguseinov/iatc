import React from "react";
import { Link } from "react-router-dom";
import "./HeaderBottom.css";
import Logo from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";
const HeaderBottom = () => {
  return (
    <div className="custom__header__bottom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <div className="custom__header__bottom__left">
              <Logo />
            </div>
          </div>
          <div className="col-lg-9">
            <Navigation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
