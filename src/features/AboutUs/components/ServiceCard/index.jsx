import React from "react";
import { Link } from "react-router-dom";
import "./ServiceCard.scss";

ServiceCard.propTypes = {};

function ServiceCard(props) {
  const { service } = props;

  return (
    <div className="service-card">
      <div className="service-card__icon">
        <i className="fas fa-cog"></i>
      </div>
      <div className="service-card__content">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <Link to={service.to} className="button button--red">
          Read more
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;
