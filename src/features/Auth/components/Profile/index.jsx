import React from "react";
import PropTypes from "prop-types";
import "./Profile.scss";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

Profile.propTypes = {};

function Profile(props) {
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
                  <h3 className="profile__name">My name</h3>
                  <div className="profile__follow">
                    <div className="profile__follower">
                      <span>0</span> Follower
                    </div>
                    <div className="profile__following">
                      <span>0</span> Following
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
                  <i className="far fa-star"></i> Rating: <span>4.5</span>
                </div>
                <div className="profile-other">
                  <i className="fas fa-calendar-week"></i> Member from:{" "}
                  <span>01/01/2021</span>
                </div>
                <div className="profile-other">
                  <i className="fas fa-map-marker-alt"></i> Address:{" "}
                  <span>Tien Giang</span>
                </div>
                <div className="profile-other">
                  <i className="far fa-comments"></i> Address: <span>100</span>%
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="profile-product">
          <h2>
            Products: <span>0</span>
          </h2>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
