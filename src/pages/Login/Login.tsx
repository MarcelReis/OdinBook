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
    <S.MainGrid>
      <img src="/image.png" alt="" width="100%" />
      <S.LoginBox>
        <Typography as="h2" style={{ fontSize: "42px", textAlign: "center" }}>
          Welcome
        </Typography>

        <br />
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
        <Divisor />

        <Typography as="h2" style={{ fontSize: "18px", textAlign: "center" }}>
          Login with:
        </Typography>

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
      </S.LoginBox>
    </S.MainGrid>
  );
};

export default LoginPage;
