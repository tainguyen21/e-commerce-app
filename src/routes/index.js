import React from "react";
import AboutUs from "features/AboutUs";
import Contact from "features/Contact";
import Home from "features/Home";
import Product from "features/Product";
import SignIn from "features/Auth/pages/SignIn";
import SignUp from "features/Auth/pages/SignUp";
import ProfilePage from "features/Auth/pages/ProfilePage";
import NotFound from "components/NotFound";
import UserPage from "features/Auth/pages/UserPage";

const routes = [
  {
    exact: true,
    route: "/",
    component: () => <Home />,
  },
  {
    exact: false,
    route: "/about",
    component: () => <AboutUs />,
  },
  {
    exact: false,
    route: "/products",
    component: () => <Product />,
  },
  {
    exact: false,
    route: "/contact",
    component: () => <Contact />,
  },
  {
    exact: false,
    route: "/sign-in",
    component: () => <SignIn />,
  },
  {
    exact: false,
    route: "/sign-up",
    component: () => <SignUp />,
  },
  {
    exact: false,
    route: "/profile",
    component: () => <ProfilePage />,
  },
  {
    exact: false,
    route: "/user/:id",
    component: () => <UserPage />,
  },
  {
    exact: false,
    component: () => <NotFound />,
  },
];

export default routes;
