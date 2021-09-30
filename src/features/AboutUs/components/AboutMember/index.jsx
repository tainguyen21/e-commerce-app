import React from "react";
import { Container } from "reactstrap";
import MemberList from "../MemberList";
import "./AboutMember.scss";

AboutMember.propTypes = {};

function AboutMember(props) {
  return (
    <div className="about-member">
      <Container>
        <div className="about-member__heading">
          <h3 className="border-bottom">Out Team Members</h3>
        </div>
      </Container>
      <MemberList />
    </div>
  );
}

export default AboutMember;
