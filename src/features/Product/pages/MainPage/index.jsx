import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./MainPage.scss";
import ProductList from "features/Product/components/ProductList";
import Banner from "components/Banner";
import Info from "components/Info";
import Purchase from "components/Purchase";

MainPage.propTypes = {};

function MainPage(props) {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div>
      <Banner />

      <section className="lastest-product-section">
        <ProductList title="Lastest Product" view="View all products" />
      </section>

      <section className="info-section">
        <Info />
      </section>

      <section className="purchase-section">
        <Purchase />
      </section>
    </div>
  );
}

export default MainPage;
