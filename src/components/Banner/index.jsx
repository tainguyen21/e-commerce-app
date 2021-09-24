import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.scss";

Banner.propTypes = {};

const items = [
  {
    image:
      "https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1025&q=80",
    type: "Best offer",
    title: "New arrivals on sale",
  },
  {
    image:
      "https://images.unsplash.com/photo-1628191081071-a2b761bf21d9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    type: "Flash deals",
    title: "Get your best products",
  },
  {
    image:
      "https://images.unsplash.com/photo-1632381118348-523c12f1f531?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1172&q=80",
    type: "Last minute",
    title: "Grab last minute deals",
  },
];

function Banner(props) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <section className="banner">
      <Slider {...sliderSettings}>
        {items.map((item, index) => (
          <div key={index}>
            <div className="banner__slide">
              <div className="banner__overlay" />
              <img className="banner__image" src={item.image} alt="banner" />
              <span className="banner__type">{item.type}</span>
              <h2 className="banner__title">{item.title}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Banner;
