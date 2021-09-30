import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./AboutInfo.scss";

AboutInfo.propTypes = {};

function AboutInfo(props) {
  return (
    <div className="about-info">
      <Container>
        <h3 className="about-info__heading border-bottom">Our Background</h3>
        <Row>
          <Col>
            <img
              className="about-info__image"
              src="https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
              alt="about-info"
            />
          </Col>
          <Col>
            <div className="about-info__right">
              <h3>Who we are &amp; What we do?</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
                voluptate nihil eum consectetur similique? Consectetur, quod,
                incidunt, harum nisi dolores delectus reprehenderit voluptatem
                perferendis dicta dolorem non blanditiis ex fugiat. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit.
              </p>
              <p className="border-bottom">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
                voluptate nihil eum consectetur similique? Consectetur, quod,
                incidunt, harum nisi dolores delectus reprehenderit voluptatem
                perferendis dicta dolorem non blanditiis ex fugiat. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit.
              </p>
              <ul className="about-info-social">
                <li className="about-info-social__item">
                  <i className="fab fa-facebook"></i>
                </li>
                <li className="about-info-social__item">
                  <i className="fab fa-twitter"></i>
                </li>
                <li className="about-info-social__item">
                  <i className="fab fa-linkedin"></i>
                </li>
                <li className="about-info-social__item">
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

export default AboutInfo;
