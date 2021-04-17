import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider, defaultTheme } from "@adobe/react-spectrum";

import { client } from "./apollo";
import { useRegistration } from "./lib/odinAuth";

import LoadingPage from "./pages/Loading";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import FeedPage from "./pages/Feed";

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
    return <SignUpPage />;
  }

  return (
    <Switch>
      <Route exact path="/" component={FeedPage} />
    </Switch>
  );
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider theme={defaultTheme} colorScheme="dark">
        <Router>
          <Routes />
        </Router>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
