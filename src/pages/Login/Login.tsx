import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import * as S from "./Login.styled";

import { Email } from "@styled-icons/material/Email";
import { Lock } from "@styled-icons/material/Lock";
import { Facebook } from "@styled-icons/boxicons-logos/Facebook";
import { Github } from "@styled-icons/boxicons-logos/Github";
import { Google } from "@styled-icons/boxicons-logos/Google";

import Button from "../../marvieUI/atoms/Button";
import Divisor from "../../marvieUI/atoms/Divisor";
import TextField from "../../marvieUI/atoms/TextField";
import Typography from "../../marvieUI/atoms/Typography";

const LoginPage = () => {
  const { facebookLogin, githubLogin, googleLogin, mailLogin } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mailLogin(email, password);
  };

  return (
    <S.MainGrid>
      <S.Image src="/image.png" alt="" />
      <S.LoginBox>
        <Typography as="h2" style={{ fontSize: "42px", textAlign: "center" }}>
          Welcome
        </Typography>

        <br />
        <br />

        <form action="" onSubmit={onSubmitLogin}>
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
        </form>

        <Divisor />

        <Typography as="h2" style={{ fontSize: "18px", textAlign: "center" }}>
          Login with:
        </Typography>

        <br />
        <S.SocialButtons>
          <S.FacebookButton onClick={facebookLogin}>
            <Facebook size="32px" />
          </S.FacebookButton>
          <S.GithubkButton onClick={githubLogin}>
            <Github size="32px" />
          </S.GithubkButton>
          <S.GoogleButton onClick={googleLogin}>
            <Google size="32px" />
          </S.GoogleButton>
        </S.SocialButtons>
        <br />
        <Button variant="secondary" onClick={() => history.push("/signup")}>
          Create New Account
        </Button>
      </S.LoginBox>
    </S.MainGrid>
  );
};

export default LoginPage;
