import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.scss";
import PropTypes from "prop-types";

ProductCard.propTypes = {
  product: PropTypes.object,
};

ProductCard.defaultProps = {
  product: {},
};

function ProductCard(props) {
  const { product } = props;

  return (
    <div className="product">
      <Link to={`/products/${product.id}`}>
        <img src={product.image[0]} alt="product" className="product__image" />
        <div className="product__content">
          <div className="product__info">
            <span className="product__name">{product.name}</span>
            <span className="product__price">${product.price}</span>
          </div>
          <p className="product__desc">{product.description}</p>
          <div className="product__review">{product.address}</div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
