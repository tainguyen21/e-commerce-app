import React from "react";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../ProductCard";
import "./ProductList.scss";

ProductList.propTypes = {};

function ProductList(props) {
  return (
    <div className="product-list">
      <Container>
        <Row>
          <Col lg="4">
            <ProductCard />
          </Col>
          <Col lg="4">
            <ProductCard />
          </Col>
          <Col lg="4">
            <ProductCard />
          </Col>
          <Col lg="4">
            <ProductCard />
          </Col>
          <Col lg="4">
            <ProductCard />
          </Col>
          <Col lg="4">
            <ProductCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductList;
