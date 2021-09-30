import NotFound from "components/NotFound";
import MainPage from "features/Contact/pages/MainPage";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";

Contact.propTypes = {};

function Contact(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={MainPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Contact;
