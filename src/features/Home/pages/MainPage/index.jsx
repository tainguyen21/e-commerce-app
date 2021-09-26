import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./MainPage.scss";
import ProductList from "features/Product/components/ProductList";
import Banner from "components/Banner";
import Info from "components/Info";
import Purchase from "components/Purchase";
import Footer from "components/Footer";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

MainPage.propTypes = {};

function MainPage(props) {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div>
      <Banner />

      <section className="lastest-product-section">
        <Container>
          <div className="lastest-product-section__heading">
            <h3>Lastest Product</h3>
            <Link to="/">View all products</Link>
          </div>
        </Container>
        <ProductList />
      </section>

      <section className="info-section">
        <Info />
      </section>

      <section className="purchase-section">
        <Purchase />
      </section>

      <Footer />
    </div>
  );
}

export default MainPage;