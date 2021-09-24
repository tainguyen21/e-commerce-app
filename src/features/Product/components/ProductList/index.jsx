import React from "react";
import PropTypes from "prop-types";
import "./ProductList.scss";
import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";

ProductList.propTypes = {};

function ProductList(props) {
  const { title, view } = props;

  return (
    <div className="product-list">
      {title && view && (
        <div className="product-list__heading">
          <h3>{title}</h3>
          <Link to="/">{view}</Link>
        </div>
      )}
      <div className="product-list__content">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default ProductList;
