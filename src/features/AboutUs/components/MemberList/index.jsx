import React from "react";
import { Col, Container, Row } from "reactstrap";
import MemberCard from "../MemberCard";
import "./MemberList.scss";

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
