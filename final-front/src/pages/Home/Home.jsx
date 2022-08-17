import React from "react";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import "./Home.css";
import SliderList from "../../components/Main/SliderList/SliderList";
const Home = () => {
  const Sliders = [
    {
      id: 1,
      img: "https://htmldemo.net/eduhome/eduhome/img/slider/slider1.jpg",
      title: "Education makes Humanity",
      desc: "I must explain to you how all this mistaken idea of denouncing pleasure and prsing pain was born and I will give you a complete account of the system",
      url: "https://google.com",
    },
    {
      id: 2,
      img: "https://htmldemo.net/eduhome/eduhome/img/slider/slider2.jpg",
      title: "Education makes Humanity",
      desc: "I must explain to you how all this mistaken idea of denouncing pleasure and prsing pain was born and I will give you a complete account of the system",
      url: "https://google.com",
    },
    {
      id: 3,
      img: "https://htmldemo.net/eduhome/eduhome/img/slider/slider3.jpg",
      title: "Education makes Humanity",
      desc: "I must explain to you how all this mistaken idea of denouncing pleasure and prsing pain was born and I will give you a complete account of the system",
      url: "https://google.com",
    },
  ];

  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    setSliders(Sliders);
  }, []);
  return (
    <div> 
      <SliderList sliders={sliders} />
    </div>
  );
};

export default Home;
