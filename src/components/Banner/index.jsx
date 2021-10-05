import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Banner.scss";
import { items } from "constants/banner";

Banner.propTypes = {};

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
