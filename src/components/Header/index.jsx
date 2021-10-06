import { getAuth, signOut } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import {
  Button,
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
  const [style, setStyle] = useState({});
  const user = useSelector((state) => state.user);
  const displaySignOutBtn = Object.keys(user).length ? true : false;
  const auth = getAuth();
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    await signOut(auth);

    history.push("/");
  };

  function handleScroll() {
    if (window.scrollY >= 500) {
      setStyle({
        header: {
          backgroundColor: "white",
          position: "fixed",
          top: "0",
          boxShadow: "0px 1px 10px rgb(0 0 0 / 10%)",
        },
        brand: {
          color: "black",
        },
        navLink: {
          color: "black",
        },
      });
    } else {
      setStyle({});
    }
  }

  useEffect(() => {
    window.onscroll = handleScroll;
  }, []);

  return (
    <header className="header" style={style.header}>
      <Navbar className="header__nav" expand="md">
        <Container>
          <Link
            style={style.brand}
            className="navbar-brand header__brand"
            to="/"
          >
            Sixteen <span>Clothing</span>
          </Link>
          <NavbarToggler className="header__btn" onClick={toggle} />
          <Collapse className="justify-content-end" isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  style={style.navLink}
                  exact
                  className="header__link"
                  to="/"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={style.navLink}
                  className="header__link"
                  to="/products"
                >
                  Our Products
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={style.navLink}
                  className="header__link"
                  to="/about"
                >
                  About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={style.navLink}
                  className="header__link"
                  to="/contact"
                >
                  Contact Us
                </NavLink>
              </NavItem>
              <NavItem>
                {Object.keys(user).length ? (
                  <NavLink
                    style={style.navLink}
                    className="header__link "
                    to="/profile"
                  >
                    <i className="far fa-user"></i>
                    {user.name}
                  </NavLink>
                ) : (
                  <NavLink
                    style={style.navLink}
                    className="header__link"
                    to="/sign-in"
                  >
                    Sign in
                  </NavLink>
                )}
              </NavItem>
              <NavItem>
                <Button
                  style={
                    displaySignOutBtn
                      ? {
                          ...style.navLink,
                          display: "block",
                        }
                      : { ...style.navLink }
                  }
                  onClick={handleSignOut}
                  className="header__link sign-out"
                >
                  Sign out
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
