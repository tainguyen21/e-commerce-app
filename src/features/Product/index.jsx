import NotFound from "components/NotFound";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import AddProductPage from "./pages/AddProductPage";
import AllProductsPage from "./pages/AllProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import UpdateProductPage from "./pages/UpdateProductPage";

Product.propTypes = {};

function Product(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={AllProductsPage} />
      <Route path={`${match.url}/add`} component={AddProductPage} />
      <Route exact path={`${match.url}/:id`} component={ProductDetailPage} />
      <Route path={`${match.url}/update/:id`} component={UpdateProductPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Product;
