import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Catalog from '../pages/Catalog';
import SignIn from '../pages/SignIn';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/catalog" exact component={Catalog} />
    </Switch>
  );
};

export default Routes;
