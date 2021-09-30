import NotFound from "components/NotFound";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import MainPage from "./pages/MainPage";

AboutUs.propTypes = {};

function AboutUs(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={MainPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default AboutUs;
