import React from "react";
import "./Slider.css";
const Slider = (props) => {
  const slider = props.slider;
  console.log(slider);
  return (
    <div className="single-slider">
      <img src={slider.img} alt="" />
    </div>
  );
};

export default Slider;
