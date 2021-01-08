import React from "react";
import { Route, Switch } from "react-router-dom";
import useAuth from "./hooks/useAuth";

import FeedPage from "./pages/Feed";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";

const Routes = () => {
  const { isLogged } = useAuth();

  return (
    <Switch>
      {isLogged ? (
        <>
          <Route exact path="/" component={FeedPage} />
          <Route exact path="/:user" component={ProfilePage} />
          <Route component={NotFound} />
        </>
      ) : (
        <LoginPage />
      )}
    </Switch>
  );
};

export default Routes;
