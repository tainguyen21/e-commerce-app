import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Container, Row } from "reactstrap";
import "./Info.scss";

Info.propTypes = {};

function Info(props) {
  return (
    <div className="info">
      <Container>
        <h3 className="info__heading border-bottom">About Sixteen Clothing</h3>
        <Row>
          <Col lg="6">
            <div className="info__left">
              <span>Looking for the best products?</span>
              <p>
                This template is free to use for your business websites.
                However, you have no permission to redistribute the downloadable
                ZIP file on any template collection website. Contact us for more
                info.
              </p>
              <ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
              </ul>
              <Button className="button button--red">Read more</Button>
            </div>
          </Col>
          <Col lg="6">
            <div className="info__right">
              <img
                src="https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                alt="info"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Info;
