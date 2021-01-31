import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { loader } from "graphql.macro";

import { KeyboardArrowDown } from "@styled-icons/material/KeyboardArrowDown";

import useAuth from "../../hooks/useAuth";
import IconButton from "../../marvieUI/atoms/IconButton";

import { useDarkMode } from "../../theme";

import * as S from "./Appbar.styled";
import { useQuery } from "@apollo/client";
import { AppbarQuery } from "../../generated/graphql";

const query = loader("./Appbar.graphql");

const Appbar = () => {
  const { isLogged, logout } = useAuth();
  const { isDarkmode, toggleDarkmode } = useDarkMode();

  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => setOpenMenu((s) => !s);

  useEffect(() => {
    setOpenMenu(false);
  }, [location.pathname, isLogged]);

  const { data } = useQuery<AppbarQuery>(query);

  return (
    <S.Appbar>
      <Switch>
        <Route exact path="/">
          <S.Title as="h1">
            <Link to="/">OdinBook</Link>
          </S.Title>
        </Route>
        <Route>
          <S.Title as="h2">
            <Link to="/">OdinBook</Link>
          </S.Title>
        </Route>
      </Switch>

      {isLogged && (
        <S.Box>
          {data && (
            <S.Tag to={`/${data.user.username}`} activeClassName="on">
              <S.Image
                src={data.user.thumb || "https://placekitten.com/32/32"}
              />
              <S.Name>{data.user.firstname}</S.Name>
            </S.Tag>
          )}
          <IconButton onClick={toggleMenu}>
            <KeyboardArrowDown />
          </IconButton>
        </S.Box>
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
