import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Email } from "@styled-icons/material/Email";
import { Lock } from "@styled-icons/material/Lock";

import useAuth from "../../hooks/useAuth";

import * as S from "./Login.styled";

import { Facebook } from "@styled-icons/boxicons-logos/Facebook";
import { Github } from "@styled-icons/boxicons-logos/Github";
import { Twitter } from "@styled-icons/boxicons-logos/Twitter";

import Button from "../../marvieUI/atoms/Button";
import Divisor from "../../marvieUI/atoms/Divisor";
import TextField from "../../marvieUI/atoms/TextField";
import Typography from "../../marvieUI/atoms/Typography";

const LoginPage = () => {
  const { facebookLogin } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <S.LoginBox>
      <div>
        <br />
        <S.Box as="form">
          <Typography>Bem Vindo</Typography>

          <br />

          <TextField
            icon={Email}
            label="Username"
            placeholder="Username"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />

          <TextField
            icon={Lock}
            label="Password"
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <br />

          <Button type="submit">Log In</Button>
        </S.Box>
      </div>
      <Divisor />

      <S.Box>
        <Typography>Login with:</Typography>
        <br />
        <S.SocialButtons>
          <S.FacebookButton onClick={facebookLogin}>
            <Facebook size="32px" />
          </S.FacebookButton>
          <S.GithubkButton>
            <Github size="32px" />
          </S.GithubkButton>
          <S.TwitterButton>
            <Twitter size="32px" />
          </S.TwitterButton>
        </S.SocialButtons>
        <br />
        <Button variant="secondary" onClick={() => history.push("/signup")}>
          Create New Account
        </Button>
      </S.Box>
    </S.LoginBox>
  );
};

export default LoginPage;
