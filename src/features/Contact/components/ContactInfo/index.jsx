import React from "react";
import PropTypes from "prop-types";
import "./ContactInfo.scss";
import { Col, Container, Row } from "reactstrap";
import ContactForm from "../ContactForm";
import CollapseInfo from "features/Contact/components/CollapseInfo";

ContactInfo.propTypes = {};

function ContactInfo(props) {
  return (
    <div>
      <Container>
        <div className="contact-info__heading">
          <h2 className="border-bottom">Send us a Message</h2>
        </div>
        <Row>
          <Col lg="8">
            <ContactForm />
          </Col>
          <Col lg="4">
            <CollapseInfo />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactInfo;
