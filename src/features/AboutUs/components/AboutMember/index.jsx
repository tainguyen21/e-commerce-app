import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import "./AboutMember.scss";
import MemberList from "../MemberList";

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
