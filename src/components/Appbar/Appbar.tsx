import React from "react";
import { Route, Switch } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import Typography from "../../marvieUI/atoms/Typography";

import { useDarkMode } from "../../theme";

import * as S from "./Appbar.styled";

const Appbar = () => {
  const { isLogged, logout } = useAuth();
  const { isDarkmode, toggleDarkmode } = useDarkMode();

  return (
    <S.Appbar>
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
    </S.Appbar>
  );
};

export default Appbar;
