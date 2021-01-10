import React from "react";
import { Route, Switch } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Surface from "../../marvieUI/atoms/Surface";
import Typography from "../../marvieUI/atoms/Typography";
import { useDarkMode } from "../../theme";

const Appbar = () => {
  const { isLogged, logout } = useAuth();
  const { isDarkmode, toggleDarkmode } = useDarkMode();

  return (
    <Surface as="header">
      <Switch>
        <Route exact path="/">
          <Typography as="h1">OdinBook</Typography>
        </Route>
        <Route>
          <Typography as="h2">OdinBook</Typography>
        </Route>
      </Switch>

      <button onClick={toggleDarkmode}>{isDarkmode ? "dark" : "light"}</button>

      {isLogged && <button onClick={logout}>Logout</button>}
    </Surface>
  );
};

export default Appbar;
