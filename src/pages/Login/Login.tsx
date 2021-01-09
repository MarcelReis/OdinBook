import React from "react";
import { useHistory } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import * as S from "./Login.styled";

import Surface from "../../marvieUI/atoms/Surface";
import Button from "../../marvieUI/atoms/Button";
import Container from "../../marvieUI/atoms/Container";
import Divisor from "../../marvieUI/atoms/Divisor";

const LoginPage = () => {
  const { facebookLogin } = useAuth();
  const history = useHistory();

  return (
    <Container>
      <S.LoginBox>
        <Surface variant={1} rounded>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" />

            <label htmlFor="password">Password</label>
            <input id="password" type="text" />

            <button onClick={facebookLogin}>Continue with Facebook</button>
            <Button type="submit">Log In</Button>
          </div>
          <Divisor />

          <Button variant="secondary" onClick={() => history.push("/signup")}>
            Create New Account
          </Button>
        </Surface>
      </S.LoginBox>
    </Container>
  );
};

export default LoginPage;
