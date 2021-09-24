import React from "react";
import PropTypes from "prop-types";
import "./ProductCard.scss";

ProductCard.propTypes = {};

function ProductCard(props) {
  return (
    <div className="product">
      <img
        src="https://images.unsplash.com/photo-1632460353892-021d84246d2b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
        alt="product"
        className="product__image"
      />
      <div className="product__content">
        <div className="product__info">
          <span className="product__name">Title goes here</span>
          <span className="product__price">$25.75</span>
        </div>
        <p className="product__desc">
          Lorem ipsume dolor sit amet, adipisicing elite. Itaque, corporis nulla
          aspernatur.
        </p>
        <div className="product__review">
          <div className="product__rating">
            <i className="product__star fas fa-star"></i>
            <i className="product__star fas fa-star"></i>
            <i className="product__star fas fa-star"></i>
            <i className="product__star fas fa-star-half-alt"></i>
            <i className="product__star far fa-star"></i>
          </div>
          <span>Reviews (24)</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
