import React from "react";
import PropTypes from "prop-types";
import "./MemberList.scss";
import { Col, Container, Row } from "reactstrap";
import MemberCard from "../MemberCard";

MemberList.propTypes = {};

function MemberList(props) {
  return (
    <div className="member-list">
      <Container>
        <Row>
          <Col lg="4">
            <MemberCard />
          </Col>
          <Col lg="4">
            <MemberCard />
          </Col>
          <Col lg="4">
            <MemberCard />
          </Col>
          <Col lg="4">
            <MemberCard />
          </Col>
          <Col lg="4">
            <MemberCard />
          </Col>
          <Col lg="4">
            <MemberCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MemberList;
