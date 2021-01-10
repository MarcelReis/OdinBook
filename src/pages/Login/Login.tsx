import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Email } from "@styled-icons/material/Email";
import { Lock } from "@styled-icons/material/Lock";

import useAuth from "../../hooks/useAuth";

import * as S from "./Login.styled";

import Button from "../../marvieUI/atoms/Button";
import Divisor from "../../marvieUI/atoms/Divisor";
import TextField from "../../marvieUI/atoms/TextField";

const LoginPage = () => {
  const { facebookLogin } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <S.LoginBox>
      <div>
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

        <button onClick={facebookLogin}>Continue with Facebook</button>
        <Button type="submit">Log In</Button>
      </div>
      <Divisor />

      <Button variant="secondary" onClick={() => history.push("/signup")}>
        Create New Account
      </Button>
    </S.LoginBox>
  );
};

export default LoginPage;
