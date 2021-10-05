import React from "react";
import { Container } from "reactstrap";
import MemberList from "../MemberList";
import "./AboutMember.scss";

AboutMember.propTypes = {};

function AboutMember(props) {
  const { members } = props;
  return (
    <div className="about-member">
      <Container>
        <div className="about-member__heading">
          <h3 className="border-bottom">Out Team Members</h3>
        </div>
      </Container>
      <MemberList members={members} />
    </div>
  );
}

export default AboutMember;
