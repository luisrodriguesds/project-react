import React from "react";

import { useAuth } from "../contexts/auth";
import AppRoute from "./app.route";
import AuthRoute from "./auth.route";

const Routes: React.FC = () => {
  const { isLogged } = useAuth();
  return <>{isLogged ? <AuthRoute /> : <AppRoute />}</>;
};

export default Routes;
