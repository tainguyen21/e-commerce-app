import React from "react";
import { Col, Container, Row } from "reactstrap";
import ServiceCard from "../ServiceCard";
import "./AboutService.scss";

AboutService.propTypes = {};

function AboutService(props) {
  const { services } = props;

  return (
    <div className="about-service">
      <Container>
        <Row>
          {services.map((item, index) => (
            <Col lg="4" key={index}>
              <ServiceCard service={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default AboutService;
