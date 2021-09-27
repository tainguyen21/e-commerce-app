import React from "react";
import PropTypes from "prop-types";
import "./AboutService.scss";
import { Col, Container, Row } from "reactstrap";
import ServiceCard from "../ServiceCard";

AboutService.propTypes = {};

function AboutService(props) {
  return (
    <div className="about-service">
      <Container>
        <Row>
          <Col lg="4">
            <ServiceCard />
          </Col>
          <Col lg="4">
            <ServiceCard />
          </Col>
          <Col lg="4">
            <ServiceCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutService;
