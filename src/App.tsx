import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Routes from "./Routes";

import useAuth from "./hooks/useAuth";

import LoginPage from "./pages/Login";
import LoadingPage from "./pages/Loading";

import Footer from "./components/Footer";
import Appbar from "./components/Appbar";

const client = new ApolloClient({
  uri: "https://localhost:3001",
  cache: new InMemoryCache(),
});

function App() {
  const { isLogged, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (!isLogged) {
    return (
      <ApolloProvider client={client}>
        <LoginPage />
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Appbar />

        <Switch>
          <Routes />
        </Switch>

        <Footer />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
