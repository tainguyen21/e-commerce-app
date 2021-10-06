import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ProductItem.scss";

ProductItem.propTypes = {
  product: PropTypes.object,
};

ProductItem.defaultProps = {
  product: {},
};

function ProductItem(props) {
  const { product } = props;

  return (
    <div className="product-item">
      <div className="product-item__left">
        <img
          className="product-item__avatar"
          src={product.image[0]}
          alt="product"
        />
        <div className="product-item__info">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <span>{product.address}</span>
        </div>
        <div className="product-item__price">
          $ <span>{product.price}</span>
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
