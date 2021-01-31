import React, { useState } from "react";
import TextField from "../../marvieUI/organisms/TextField";

import * as S from "./FinishRegistration.styled";

import { AccountCircle } from "@styled-icons/material/AccountCircle";
import { FontDownload } from "@styled-icons/material/FontDownload";

import Button from "../../marvieUI/atoms/Button";
import { useMutation } from "@apollo/client";
import {
  CreateUserInput,
  FinishRegistrationMutation,
  FinishRegistrationMutationVariables,
} from "../../generated/graphql";
import { loader } from "graphql.macro";

const mutation = loader("./FinishRegistration.graphql");

const FinishRegistrationPage = () => {
  const [firstname, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");

  const [validating, setValidating] = useState(false);

  const [createUser] = useMutation<
    FinishRegistrationMutation,
    FinishRegistrationMutationVariables
  >(mutation);

  const onSubmit = () => {
    setValidating(true);

    const input: CreateUserInput = {
      firstname,
      surname,
      username,
    };

    console.log("input :>> ", input);

    createUser({ variables: { input } }).catch((error) => console.error(error));
  };

  return (
    <S.Container>
      <S.Grid span={{ sm: 2 }}>
        <TextField
          label="username"
          placeholder="Username"
          icon={AccountCircle}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          valid={
            username.trim().length !== 0 ? true : validating ? false : undefined
          }
        />
      </S.Grid>

      <S.Grid span={{ sm: 2, md: 1 }}>
        <TextField
          label="firstName"
          placeholder="First Name"
          icon={FontDownload}
          value={firstname}
          onChange={(event) => setFirstName(event.target.value)}
          valid={
            firstname.trim().length !== 0
              ? true
              : validating
              ? false
              : undefined
          }
        />
      </S.Grid>

      <S.Grid span={{ sm: 2, md: 1 }}>
        <TextField
          label="surname"
          placeholder="Surname"
          icon={FontDownload}
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
          valid={
            surname.trim().length !== 0 ? true : validating ? false : undefined
          }
        />
      </S.Grid>

      <S.Grid span={{ sm: 2 }}>
        <Button onClick={onSubmit}>Create</Button>
      </S.Grid>
    </S.Container>
  );
};

export default FinishRegistrationPage;
