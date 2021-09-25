import React from "react";
import PropTypes from "prop-types";
import "./Footer.scss";
import { Col, Container, Row } from "reactstrap";

Footer.propTypes = {};

function Footer(props) {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col>
            <div className="footer__left">
              <div className="footer__address">
                <i className="fas fa-map-marker-alt"></i>
                <p>
                  21 Revolution Street <span>Paris, France</span>
                </p>
              </div>
              <div className="footer__phone">
                <i className="fas fa-phone-alt"></i>
                <p>+1 234 567 890</p>
              </div>
              <div className="footer__mail">
                <i className="fas fa-envelope"></i>
                <p>support@gmail.com</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className="footer_right">
              <h3 className="footer__about">About the company</h3>
              <p className="footer__desc">
                This template is free to use for your business websites.
                However, you have no permission to redistribute the downloadable
                ZIP file on any template collection website. Contact us for more
                info.
              </p>
              <ul className="footer__social">
                <li className="footer-social__item">
                  <i className="fab fa-facebook"></i>
                </li>
                <li className="footer-social__item">
                  <i className="fab fa-twitter"></i>
                </li>
                <li className="footer-social__item">
                  <i className="fab fa-linkedin"></i>
                </li>
                <li className="footer-social__item">
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

export default Footer;
