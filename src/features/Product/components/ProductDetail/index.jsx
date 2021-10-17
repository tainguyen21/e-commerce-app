import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Button, Col, Container, Row } from "reactstrap";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { calculateRating, calculateResponse } from "utils/common";
import "./ProductDetail.scss";

ProductDetail.propTypes = {
  product: PropTypes.object,
  user: PropTypes.object,
  onSavePostClick: PropTypes.func,
  hasSaved: PropTypes.bool,
  onChatClick: PropTypes.func,
};

ProductDetail.defaultProps = {
  product: { image: [] },
  user: {},
  onSavePostClick: null,
  hasSaved: false,
  onChatClick: null,
};

function ProductDetail(props) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const { product, user, onSavePostClick, hasSaved, onChatClick } = props;

  const rating = calculateRating(user.rating);
  const response = calculateResponse(user.messages);

  const handleSavePostClick = () => {
    if (onSavePostClick) onSavePostClick();
  };

  return (
    <div>
      <Container>
        <div className="product-detail">
          <Row>
            <Col lg="8">
              <Slider {...sliderSettings}>
                {product.image.map((image, index) => (
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
                    <span>$</span>
                    {product.price}
                  </div>
                  <p className="product-detail__description">
                    {product.description}
                  </p>
                </div>
                <div className="product-detail__right">
                  <Button onClick={handleSavePostClick}>
                    {hasSaved ? "Unsave" : "Save"}{" "}
                    <i className="far fa-heart"></i>
                  </Button>
                </div>
              </div>
              <div className="product-detail__address">{product.address}</div>
            </Col>
            <Col lg="4">
              <div className="product-detail-user-container">
                <div className="product-detail-user">
                  <div className="product-detail-user__info">
                    <i className="far fa-user product-detail-user__avatar"></i>
                    <div>
                      <span className="product-detail-user__name">
                        {user.name}
                      </span>
                    </div>
                  </div>
                  <Link to={`/user/${product.userId}`}>See detail</Link>
                </div>
                <div className="product-detail-user__review">
                  <div className="product-detail-user__rating">
                    Rating
                    <span>{rating}</span>
                  </div>
                  <div className="product-detail-user__response">
                    Chat response
                    <span>
                      {response ? `${response}%` : "Don't have message"}
                    </span>
                  </div>
                </div>
                <div className="product-detail-user__contact">
                  <div className="product-detail-user__phone">
                    <i className="fas fa-phone-alt"></i>
                    {user.phoneNumber
                      ? user.phoneNumber
                      : "Don't have phone number"}
                  </div>
                  <div
                    onClick={() => onChatClick(product.userId)}
                    className="product-detail-user__chat"
                  >
                    <i className="far fa-comments"></i>
                    Chat with seller
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default ProductDetail;
