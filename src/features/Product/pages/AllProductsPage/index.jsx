import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Banner from "components/Banner";
import ProductList from "features/Product/components/ProductList";
import "./AllProductsPage.scss";
import { Container } from "reactstrap";
import Footer from "components/Footer";
import Header from "components/Header";

AllProductsPage.propTypes = {};

function AllProductsPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div style={{ paddingTop: "80px" }}>
      <div className="products-banner">
        <Banner />
      </div>
      <section className="products-section">
        <Container>
          <div className="products-filter">
            <li className="products-filter__item active">All Products</li>
            <li className="products-filter__item">Featured</li>
            <li className="products-filter__item">Flash deals</li>
            <li className="products-filter__item">Last minute</li>
          </div>
        </Container>
        <ProductList />
      </section>
      <Footer />
    </div>
  );
}

export default AllProductsPage;
