import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <ul className="header__bottom__links">
      <li className="header__bottom__links__item">
        <Link className="header__bottom__links__link" to="/">Home</Link>
      </li>
      <li className="header__bottom__links__item">
        <Link className="header__bottom__links__link" to="/about">About</Link>
      </li>
      <li className="header__bottom__links__item">
        <Link className="header__bottom__links__link" to="/courses">Courses</Link>
      </li>
      <li className="header__bottom__links__item">
        <Link className="header__bottom__links__link" to="/events">Events</Link>
      </li>
      <li className="header__bottom__links__item">
        <Link  className="header__bottom__links__link"to="/teachers">Teachers</Link>
      </li>
      <li className="header__bottom__links__item">
        <Link className="header__bottom__links__link" to="/blogs">Blogs</Link>
      </li>
      <li className="header__bottom__links__item">
        <Link className="header__bottom__links__link" to="/contact">Contact</Link>
      </li>
    </ul>
  );
};

export default Navigation;
