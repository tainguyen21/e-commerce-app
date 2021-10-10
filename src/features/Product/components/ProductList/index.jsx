import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../ProductCard";
import "./ProductList.scss";

ProductList.propTypes = {
  products: PropTypes.array,
  fetchMoreProduct: PropTypes.func,
};

ProductList.defaultProps = {
  products: [],
  fetchMoreProduct: null,
};

function ProductList(props) {
  const { products, fetchMoreProduct } = props;

  useEffect(() => {
    if (fetchMoreProduct) {
      const component = document.querySelector(".product-list");
      const handleScroll = () => {
        const { scrollHeight, scrollTop, offsetHeight } = component;

        if (scrollTop + offsetHeight >= scrollHeight) {
          fetchMoreProduct();
        }
      };

      component.addEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="product-list">
      <Row>
        {products.map((product, index) => (
          <Col lg="4" key={index}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProductList;
