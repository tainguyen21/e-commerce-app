import React from "react";
import PropTypes from "prop-types";
import Banner from "components/Banner";
import ProductList from "features/Product/components/ProductList";
import "./AllProductsPage.scss";
import { Container } from "reactstrap";
import Footer from "components/Footer";

AllProductsPage.propTypes = {};

function AllProductsPage(props) {
  return (
    <div>
      <Banner />
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
