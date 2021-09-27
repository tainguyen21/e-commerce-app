import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, useRouteMatch } from "react-router";
import NotFound from "components/NotFound";
import MainPage from "features/Contact/pages/MainPage";

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
