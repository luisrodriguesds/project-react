import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "../pages/SignIn";

// import { Container } from './styles';

const AppRoute: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default AppRoute;
