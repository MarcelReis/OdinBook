import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider, makeVar, useReactiveVar } from "@apollo/client";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { Helmet } from "react-helmet";

import { client } from "./apollo";
import { useRegistration } from "./lib/odinAuth";

import LoadingPage from "./pages/Loading";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import FeedPage from "./pages/Feed";
import Appbar from "./components/Appbar";
import UserPage from "./pages/User";
import NotFoundPage from "./pages/NotFound";

function Routes() {
  const { isLoading, isLogged, isRegistered } = useRegistration();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isLogged) {
    return (
      <Switch>
        <Route exact path="/signup" component={SignUpPage} />
        <Route component={LoginPage} />
      </Switch>
    );
  }

  if (!isRegistered) {
    return (
      <>
        <Appbar />
        <SignUpPage />
      </>
    );
  }

  return (
    <>
      <Appbar />
      <Switch>
        <Route exact path="/" component={FeedPage} />
        <Route exact strict path="/user/:username/" component={UserPage} />
        <NotFoundPage />
      </Switch>
    </>
  );
}

export const colorSchemeVar = makeVar<"dark" | "light">("dark");

const App = () => {
  const colorScheme = useReactiveVar(colorSchemeVar);

  return (
    <ApolloProvider client={client}>
      <Helmet>
        <title>OdinBook</title>
      </Helmet>
      <Provider theme={defaultTheme} colorScheme={colorScheme}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
