import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";

import { KeyboardArrowDown } from "@styled-icons/material/KeyboardArrowDown";

import useAuth from "../../hooks/useAuth";

import { useDarkMode } from "../../theme";

import * as S from "./Appbar.styled";
import IconButton from "../../marvieUI/atoms/IconButton";

const Appbar = () => {
  const { isLogged, logout } = useAuth();
  const { isDarkmode, toggleDarkmode } = useDarkMode();

  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => setOpenMenu((s) => !s);

  useEffect(() => {
    setOpenMenu(false);
  }, [location.pathname, isLogged]);

  return (
    <S.Appbar>
      <Switch>
        <Route exact path="/">
          <S.Title as="h1">
            <Link to="/">OdinBook</Link>
          </S.Title>
        </Route>
        <Route>
          <S.Title as="h2">OdinBook</S.Title>
        </Route>
      </Switch>

      {isLogged && (
        <IconButton onClick={toggleMenu}>
          <KeyboardArrowDown />
        </IconButton>
      )}

      {openMenu && (
        <S.Menu>
          <button onClick={toggleDarkmode}>
            {isDarkmode ? "dark" : "light"}
          </button>

          {isLogged && <button onClick={logout}>Logout</button>}
        </S.Menu>
      )}
    </S.Appbar>
  );
};

export default Appbar;
