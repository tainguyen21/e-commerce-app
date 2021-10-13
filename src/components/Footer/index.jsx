import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./Footer.scss";

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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
                voluptate nihil eum consectetur similique? Consectetur, quod,
                incidunt, harum nisi dolores delectus reprehenderit voluptatem
                perferendis dicta dolorem non blanditiis ex fugiat. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit.
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
