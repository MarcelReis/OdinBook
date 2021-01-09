import React from "react";
import { Route, Switch } from "react-router-dom";

import useAuth from "./hooks/useAuth";

import LoginPage from "./pages/Login";
import LoadingPage from "./pages/Loading";

import Footer from "./components/Footer";
import Appbar from "./components/Appbar";
import SignUp from "./pages/SignUp";
import FeedPage from "./pages/Feed";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/Profile";

function Routes() {
  const { isLogged, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (!isLogged) {
    return (
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route component={LoginPage} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={FeedPage} />
      <Route exact path="/:user" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

const App = () => {
  return (
    <>
      <Appbar />
      <Routes />
      <Footer />
    </>
  );
};

export default App;
