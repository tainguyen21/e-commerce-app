import Banner from "components/Banner";
import Footer from "components/Footer";
import Info from "features/Home/components/Info";
import Purchase from "features/Home/components/Purchase";
import ProductList from "features/Product/components/ProductList";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import "./MainPage.scss";

MainPage.propTypes = {};

function MainPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const products = useSelector((state) => state.products);

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="banner-section">
        <Banner />
      </section>

      <section className="lastest-product-section">
        <Container>
          <div className="lastest-product-section__heading border-bottom">
            <h3>Lastest Product</h3>
            <Link to="/products">View all products</Link>
          </div>
        </Container>
        <ProductList products={products} />
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
