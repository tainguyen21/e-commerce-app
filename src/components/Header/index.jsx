import React, { useState } from "react";
import { Link } from "react-router-dom";
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
                <Link className="header__link active" to="/">
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Link className="header__link" to="/">
                  Our Products
                </Link>
              </NavItem>
              <NavItem>
                <Link className="header__link" to="/">
                  About Us
                </Link>
              </NavItem>
              <NavItem>
                <Link className="header__link" to="/">
                  Contact Us
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
