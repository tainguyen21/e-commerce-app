import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, useRouteMatch } from "react-router";
import NotFound from "components/NotFound";
import MainPage from "./pages/MainPage";

Home.propTypes = {};

function Home(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={MainPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Home;
