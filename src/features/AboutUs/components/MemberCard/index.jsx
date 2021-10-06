import React from "react";
import { Link } from "react-router-dom";
import "./MemberCard.scss";

MemberCard.propTypes = {};

function MemberCard(props) {
  const { member } = props;

  return (
    <div className="member-card">
      <div className="member-card__top">
        <img
          className="member-card__avatar"
          src={member.image}
          alt="member-avatar"
        />
        <div className="member-card__overlay"></div>
        <ul className="member-card__social">
          <li>
            <Link to={member.facebook}>
              <i className="fab fa-facebook"></i>
            </Link>
          </li>
          <li>
            <Link to={member.twitter}>
              <i className="fab fa-twitter"></i>
            </Link>
          </li>
          <li>
            <Link to={member.linkedIn}>
              <i className="fab fa-linkedin"></i>
            </Link>
          </li>
          <li>
            <Link to={member.insta}>
              <i className="fab fa-instagram"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="member-card__info">
        <h3>{member.name}</h3>
        <span>{member.job}</span>
        <p>{member.description}</p>
      </div>
    </div>
  );
}

export default MemberCard;
