import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ProductItem.scss";

ProductItem.propTypes = {};

function ProductItem(props) {
  return (
    <div className="product-item">
      <div className="product-item__left">
        <img
          className="product-item__avatar"
          src="https://images.unsplash.com/photo-1633103895674-48112c9d5349?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=759&q=80"
          alt="product"
        />
        <div className="product-item__info">
          <h3>Name is here</h3>
          <p>
            Lorem ipsume dolor sit amet, adipisicing elite. Itaque, corporis
            nulla aspernatur.
          </p>
          <span>Cai Lay, Tien Giang</span>
        </div>
        <div className="product-item__price">
          $ <span>25.75</span>
        </div>
      </div>

      <div className="product-item__right">
        <Link to="/" className="button button--red update">
          Update
        </Link>
        <Link to="/" className="button button--red">
          Delete
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
