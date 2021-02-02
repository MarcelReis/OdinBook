import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ThemeProvider } from "./theme";

import { useRegistration } from "./lib/odinAuth";

import LoginPage from "./pages/Login";
import LoadingPage from "./pages/Loading";

import Footer from "./components/Footer";
import Appbar from "./components/Appbar";
import SignUpPage from "./pages/SignUp";
import FeedPage from "./pages/Feed";
import NotFound from "./pages/NotFound";
import UserPage from "./pages/User";
import FinishRegistrationPage from "./pages/FinishRegistration";
import UsersPage from "./pages/Users";

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5001/odinbook-30f97/us-central1/graphql"
      : "",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("tokenID");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
    return <FinishRegistrationPage />;
  }

  return (
    <Switch>
      <Route exact path="/" component={FeedPage} />
      <Route exact path="/users" component={UsersPage} />
      <Route exact path="/:user" component={UserPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider>
          <Appbar />
          <Routes />
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
