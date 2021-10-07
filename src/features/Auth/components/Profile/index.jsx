import React from "react";
import PropTypes from "prop-types";
import "./Profile.scss";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import ProductItem from "../ProductItem";
import { calculateRating, calculateResponse, formatDate } from "utils/common";

Profile.propTypes = {
  user: PropTypes.object,
  productsOfUser: PropTypes.array,
  productsSaving: PropTypes.array,
};

Profile.defaultProps = {
  user: {},
  productsOfUser: [],
  productsSaving: [],
};

function Profile(props) {
  const { user, productsOfUser, productsSaving } = props;
  const rating = calculateRating(user.rating);
  const response = calculateResponse(user.response);
  const memberFrom = formatDate(user.memberFrom);

  return (
    <div>
      <Container>
        <div className="profile-info">
          <Row>
            <Col lg="6">
              <div className="profile__left">
                <img
                  className="profile__avatar"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNnvYQ2QtOUCK1kmDppVoRxM6Y3S_77_A3yQ&usqp=CAU"
                  alt="profile avatar"
                />
                <div className="profile__content">
                  <h3 className="profile__name">{user.name}</h3>
                  <div className="profile__follow">
                    <div className="profile__follower">
                      <span>{user.follower}</span> Follower
                    </div>
                    <div className="profile__following">
                      <span>{user.following}</span> Following
                    </div>
                  </div>
                  <Link to="/" className="profile__update">
                    Update profile
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="profile__right">
                <div className="profile-other">
                  <i className="far fa-star"></i> Rating: <span>{rating}</span>
                </div>
                <div className="profile-other">
                  <i className="fas fa-calendar-week"></i> Member from:{" "}
                  <span>{memberFrom}</span>
                </div>
                <div className="profile-other">
                  <i className="fas fa-map-marker-alt"></i> Address:{" "}
                  <span>{user.address ? user.address : "Not update"}</span>
                </div>
                <div className="profile-other">
                  <i className="far fa-comments"></i> Response:{" "}
                  <span>
                    {response ? `${response}%` : "Don't have message"}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <Link
          to="/products/add"
          className="button button--red profile-add-product"
        >
          Add product
        </Link>

        <div className="profile-product">
          <h2 className="border-bottom">
            Products: <span>{productsOfUser ? productsOfUser.length : 0}</span>
          </h2>
          <div className="profile-product__content">
            {productsOfUser ? (
              productsOfUser.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))
            ) : (
              <p className="profile-product__message">
                You have not posted product yet
              </p>
            )}
          </div>
        </div>

        <div className="profile-product">
          <h2 className="border-bottom">
            Saving post:{" "}
            <span>{productsSaving ? productsSaving.length : 0}</span>
          </h2>
          <div className="profile-product__content">
            {productsSaving ? (
              productsSaving.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))
            ) : (
              <p className="profile-product__message">
                You have not posted product yet
              </p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
