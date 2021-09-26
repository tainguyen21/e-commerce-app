import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, useRouteMatch } from "react-router";
import MainPage from "../Home/pages/MainPage";
import NotFound from "components/NotFound";
import AllProductsPage from "./pages/AllProductsPage";

Product.propTypes = {};

function Product(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={AllProductsPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Product;
