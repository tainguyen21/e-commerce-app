import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import "./MainPage.scss";
import ProductList from "features/Product/components/ProductList";
import Banner from "components/Banner";
import Info from "components/Info";

MainPage.propTypes = {};

function MainPage(props) {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div>
      <Banner />

      <section className="lastest-product">
        <Container>
          <ProductList title="Lastest Product" view="View all products" />
        </Container>
      </section>

      <section className="info">
        <Container>
          <Info />
        </Container>
      </section>
    </div>
  );
}

export default MainPage;
