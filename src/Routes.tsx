import React from "react";
import { Route } from "react-router-dom";

import FeedPage from "./pages/Feed";
import ProfilePage from "./pages/Profile";
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={FeedPage} />
      <Route exact path="/:user" component={ProfilePage} />
      <Route component={NotFound} />
    </>
  );
};

export default Routes;
