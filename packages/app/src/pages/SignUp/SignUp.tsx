import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  QueryCreateAccountQuery,
} from "../../generated/graphql";
import Button from "../../marvieUI/atoms/Button";
import Container from "../../marvieUI/atoms/Container";
import TextField from "../../marvieUI/organisms/TextField";

import { PermIdentity } from "@styled-icons/material/PermIdentity";
import { Lock } from "@styled-icons/material/Lock";
import { Email } from "@styled-icons/material/Email";

export const queryCreateAccount = loader("./QueryCreateAccount.graphql");
export const mutationCreateAccount = loader("./MutationCreateAccont.graphql");

const initialState = {
  firstName: "",
  surname: "",
  email: "",
  password: "",
  deity: "none",

  validating: false,
  isValid: false,
};

const SignUpPage = () => {
  const [state, setState] = useState(initialState);

  const result = useQuery<QueryCreateAccountQuery>(queryCreateAccount);
  const [createAccount, mutationResult] = useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(mutationCreateAccount);

  const updateState = (partial: Partial<typeof initialState>) =>
    setState((state) => ({ ...state, ...partial }));

  const createAccountSubmitHandler = async ({
    preventDefault,
  }: React.FormEvent<HTMLFormElement>) => {
    preventDefault();

    const isValid = !!(
      state.firstName &&
      state.surname &&
      state.email &&
      state.password &&
      state.deity
    );

    if (!isValid) {
      updateState({ isValid, validating: true });
      return;
    }

    await createAccount({
      variables: {
        firstName: state.firstName,
        surname: state.surname,
        email: state.email,
        password: state.password,
        deityID: state.deity,
      },
    });
  };

  return (
    <Container>
      <form onSubmit={createAccountSubmitHandler}>
        <TextField
          id="firstname"
          label="First Name"
          placeholder="First name"
          icon={PermIdentity}
          onChange={({ target }) => updateState({ firstName: target.value })}
        />

        <TextField
          id="surname"
          label="Surname"
          placeholder="Surname"
          icon={PermIdentity}
          onChange={({ target }) => updateState({ surname: target.value })}
        />

        <label htmlFor="deity">Deity</label>
        <select
          name="cars"
          id="deity"
          disabled={!result.data}
          value={state.deity}
          onChange={({ target: { value } }) => updateState({ deity: value })}
        >
          {!result.data ? (
            <option value="loading">Loading...</option>
          ) : (
            <>
              <option value="none" disabled>
                Select
              </option>
              {result.data.deities.map((deity) => (
                <option key={deity.uri} value={deity.uri}>
                  {deity.name}
                </option>
              ))}
            </>
          )}
        </select>

        <TextField
          id="email"
          label="Email"
          placeholder="Email"
          icon={Email}
          onChange={({ target }) => updateState({ email: target.value })}
        />

        <TextField
          id="password"
          type="password"
          label="Password"
          placeholder="Password"
          icon={Lock}
          onChange={({ target }) => updateState({ password: target.value })}
        />

        {!state.isValid && state.validating && (
          <p role="alert">Fill all required fields</p>
        )}

        <Button type="submit" disabled={mutationResult.loading}>
          Create
        </Button>
      </form>
    </Container>
  );
};

export default SignUpPage;
