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
import UpdateProfile from "features/Auth/pages/UpdateProfile";
import ChatPage from "features/Chat/pages/MainPage";

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
    exact: true,
    route: "/profile",
    component: () => <ProfilePage />,
  },
  {
    exact: false,
    route: "/chat",
    component: () => <ChatPage />,
  },
  {
    exact: false,
    route: "/user/:id",
    component: () => <UserPage />,
  },
  {
    exact: false,
    route: "/profile/update",
    component: () => <UpdateProfile />,
  },
  {
    exact: false,
    component: () => <NotFound />,
  },
];

export default routes;
