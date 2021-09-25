import React from "react";
import PropTypes from "prop-types";
import "./ProductList.scss";
import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

ProductList.propTypes = {};

function ProductList(props) {
  const { title, view } = props;

  return (
    <div className="product-list">
      <Container>
        {title && view && (
          <div className="product-list__heading">
            <h3>{title}</h3>
            <Link to="/">{view}</Link>
          </div>
        )}
        <div className="product-list__content">
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
        </div>
      </Container>
    </div>
  );
}

export default ProductList;
