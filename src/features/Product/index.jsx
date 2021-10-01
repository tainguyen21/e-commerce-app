import NotFound from "components/NotFound";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import AllProductsPage from "./pages/AllProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";

Product.propTypes = {};

function Product(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={AllProductsPage} />
      <Route path={`${match.url}/:id`} component={ProductDetailPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Product;
