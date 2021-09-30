import React from "react";
import "./MemberCard.scss";

MemberCard.propTypes = {};

function MemberCard(props) {
  return (
    <div className="member-card">
      <div className="member-card__top">
        <img
          className="member-card__avatar"
          src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80"
          alt="member-avatar"
        />
        <div className="member-card__overlay"></div>
        <ul className="member-card__social">
          <li>
            <i className="fab fa-facebook"></i>
          </li>
          <li>
            <i className="fab fa-twitter"></i>
          </li>
          <li>
            <i className="fab fa-linkedin"></i>
          </li>
          <li>
            <i className="fab fa-instagram"></i>
          </li>
        </ul>
      </div>
      <div className="member-card__info">
        <h3>Jonny William</h3>
        <span>CO-Founder</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing itaque corporis
          nulla.
        </p>
      </div>
    </div>
  );
}

export default MemberCard;
