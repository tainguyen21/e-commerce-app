import Banner from "components/Banner";
import Footer from "components/Footer";
import ProductList from "features/Product/components/ProductList";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import "./AllProductsPage.scss";

AllProductsPage.propTypes = {};

function AllProductsPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const allProducts = useSelector((state) => state.products);

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
        <ProductList products={allProducts} />
      </section>
      <Footer />
    </div>
  );
}

export default AllProductsPage;
