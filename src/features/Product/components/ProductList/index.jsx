import PropTypes from "prop-types";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../ProductCard";
import "./ProductList.scss";

ProductList.propTypes = {
  products: PropTypes.array,
};

ProductList.defaultProps = {
  products: [],
};

function ProductList(props) {
  const { products } = props;

  return (
    <div className="product-list">
      <Container>
        <Row>
          {products.map((product, index) => (
            <Col lg="4" key={index}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ProductList;
