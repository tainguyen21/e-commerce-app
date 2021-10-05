import React from "react";
import { Col, Container, Row } from "reactstrap";
import MemberCard from "../MemberCard";
import "./MemberList.scss";

MemberList.propTypes = {};

function MemberList(props) {
  const { members } = props;

  return (
    <div className="member-list">
      <Container>
        <Row>
          {members.map((item, index) => (
            <Col lg="4" key={index}>
              <MemberCard member={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MemberList;
