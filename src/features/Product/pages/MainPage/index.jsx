import React from "react";
import Banner from "../../../../components/Banner/index";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import ProductList from "../../components/ProductList";
import "./MainPage.scss";

MainPage.propTypes = {};

function MainPage(props) {
  return (
    <div>
      <Banner />
      <section className="lastest-product">
        <Container>
          <ProductList title="Lastest Product" view="View all products" />
        </Container>
      </section>
    </div>
  );
}

export default MainPage;
