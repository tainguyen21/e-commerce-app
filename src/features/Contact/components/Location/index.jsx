import React from "react";
import { Col, Container, Row } from "reactstrap";
import ContactMap from "../ContactMap";
import "./Location.scss";

Location.propTypes = {};

function Location(props) {
  return (
    <div className="contact-location">
      <Container>
        <h2 className="border-bottom contact-location__heading">
          Our Location on Maps
        </h2>
        <Row>
          <Col lg="8">
            <ContactMap />
          </Col>
          <Col lg="4">
            <div className="contact-location__right">
              <h3>About our office</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed
                voluptate nihil eumester consectetur similiqu consectetur.
              </p>
              <ul className="contact-location__social">
                <li>
                  <i className="fab fa-facebook"></i>
                </li>
                <li>
                  <i className="fab fa-twitter"></i>
                </li>
                <li>
                  <i className="fab fa-linkedin"></i>
                </li>
                <li>
                  <i className="fab fa-instagram"></i>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Location;
