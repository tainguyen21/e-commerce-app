import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import "./Header.scss";

Header.propTypes = {};

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <Navbar className="header__nav" expand="md">
        <Container>
          <Link className="navbar-brand header__brand" to="/">
            Sixteen <span>Clothing</span>
          </Link>
          <NavbarToggler className="header__btn" onClick={toggle} />
          <Collapse className="justify-content-end" isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink className="header__link" to="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="header__link" to="/1">
                  Our Products
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="header__link" to="/1">
                  About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="header__link" to="/1">
                  Contact Us
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
