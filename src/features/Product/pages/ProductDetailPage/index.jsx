import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { Col, Container, Row } from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./ProductDetailPage.scss";
import Footer from "components/Footer";
import { Link } from "react-router-dom";

ProductDetailPage.propTypes = {};

function ProductDetailPage(props) {
  const match = useRouteMatch();
  const id = match.params.id;
  const product = useSelector((state) => {
    return state.products.find((product) => product.id === id);
  });

  const images = [
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1593642702909-dec73df255d7?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
    "https://images.unsplash.com/photo-1612630874598-0aa7bc569f53?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  console.log("Product: ", product);

  return (
    <div style={{ paddingTop: "80px" }}>
      <div className="product-detail-section">
        <Container>
          <div className="product-detail">
            <Row>
              <Col lg="6">
                <Slider {...sliderSettings}>
                  {images.map((image, index) => (
                    <div key={index}>
                      <img
                        className="product-detail__image"
                        src={image}
                        alt="product-detail"
                      />
                    </div>
                  ))}
                </Slider>
                <div className="product-detail__info">
                  <div className="product-detail__left">
                    <div className="product-detail__title">{product.title}</div>
                    <div className="product-detail__price">
                      ${product.price}
                    </div>
                    <p className="product-detail__description">
                      {product.description}
                    </p>
                  </div>
                  <div className="product-detail__right">
                    <Link to="/">
                      Save <i class="far fa-heart"></i>
                    </Link>
                  </div>
                </div>
                <div className="product-detail__address">{product.address}</div>
              </Col>
              <Col lg="6">
                <div className="product-detail-user">
                  <div className="product-detail-user__info">
                    <i class="far fa-user"></i>
                    <div>
                      <span className="product-detail-user__name">Tai</span>
                      <span className="product-detail-user__status">
                        Active
                      </span>
                    </div>
                  </div>
                  <Link to="/">See detail</Link>
                </div>
                <div className="product-detail-user__review">
                  <div className="product-detail-user__rating">
                    Rating
                    <span>4.5</span>
                  </div>
                  <div className="product-detail-user__response">
                    Chat response
                    <span>100%</span>
                  </div>
                </div>
                <div className="product-detail-user__contact">
                  <div className="product-detail-user__phone">
                    <i class="fas fa-phone-alt"></i>0123456789
                  </div>
                  <div className="product-detail-user__chat">
                    <i class="far fa-comments"></i>
                    Chat with seller
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
