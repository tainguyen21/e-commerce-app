import React from "react";
import { Button } from "reactstrap";
import "./ServiceCard.scss";

ServiceCard.propTypes = {};

function ServiceCard(props) {
  return (
    <div className="service-card">
      <div className="service-card__icon">
        <i className="fas fa-cog"></i>
      </div>
      <div className="service-card__content">
        <h3>Product Management</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur an adipisicing elit. Itaque,
          corporis nulla at quia quaerat.
        </p>
        <Button className="button button--red">Read more</Button>
      </div>
    </div>
  );
}

export default ServiceCard;
