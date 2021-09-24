import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, useRouteMatch } from "react-router";
import MainPage from "./pages/MainPage";
import NotFound from "../../components/NotFound";

Product.propTypes = {};

function Product(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path="/" component={MainPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Product;
