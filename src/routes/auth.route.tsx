import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Catalog from "../pages/Catalog";

const AuthRoute: React.FC = () => {
  return (
    <Switch>
      <Route path="/catalog" exact component={Catalog} />
      <Redirect from="*" to="/catalog" />
    </Switch>
  );
};

export default AuthRoute;
