import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ProductItem.scss";

ProductItem.propTypes = {
  product: PropTypes.object,
  otherUser: PropTypes.bool,
  productId: PropTypes.string,
  onDeleteClick: PropTypes.func,
};

ProductItem.defaultProps = {
  product: {},
  otherUser: false,
  productId: null,
  onDeleteClick: null,
};

function ProductItem(props) {
  const { product, otherUser, productId, onDeleteClick } = props;

  return (
    <div className="product-item">
      <div className="product-item__left">
        <img
          className="product-item__avatar"
          src={product.image[0]}
          alt="product"
        />
        <div className="product-item__info">
          <Link to={`products/${productId}`}>{product.name}</Link>
          <p>{product.description}</p>
          <span>{product.address}</span>
        </div>
        <div className="product-item__price">
          $ <span>{product.price}</span>
        </div>
      </div>

      {otherUser ? (
        <div className="product-item__right">
          <Link
            to={`/products/${productId}`}
            className="button button--red update"
          >
            See post
          </Link>
        </div>
      ) : (
        <div className="product-item__right">
          <Link
            to={`/products/update/${productId}`}
            className="button button--red update"
          >
            Update
          </Link>
          <span
            className="button button--red"
            onClick={() => onDeleteClick(productId)}
          >
            Delete
          </span>
        </div>
      )}
    </div>
  );
}

export default ProductItem;
