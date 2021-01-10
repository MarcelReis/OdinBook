import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  QueryCreateAccountQuery,
} from "../../generated/graphql";
import Surface from "../../marvieUI/atoms/Surface";
import Button from "../../marvieUI/atoms/Button";
import Container from "../../marvieUI/atoms/Container";

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
  const [createAccont, mutationResult] = useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(mutationCreateAccount);

  const updateState = (partial: Partial<typeof initialState>) =>
    setState((state) => ({ ...state, ...partial }));

  const createAccountSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

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

    await createAccont({
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
      <Surface rounded>
        <form onSubmit={createAccountSubmitHandler}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={state.firstName}
            onChange={({ target: { value } }) =>
              updateState({ firstName: value })
            }
          />

          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            value={state.surname}
            onChange={({ target: { value } }) =>
              updateState({ surname: value })
            }
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

          <label htmlFor="email-create">Email</label>
          <input
            type="email"
            id="email-create"
            value={state.email}
            onChange={({ target: { value } }) => updateState({ email: value })}
          />

          <label htmlFor="password-create">Password</label>
          <input
            type="password"
            id="password-create"
            value={state.password}
            onChange={({ target: { value } }) =>
              updateState({ password: value })
            }
          />

          {!state.isValid && state.validating && (
            <p role="alert">Fill all required fields</p>
          )}

          <Button type="submit" disabled={mutationResult.loading}>
            Create
          </Button>
        </form>
      </Surface>
    </Container>
  );
};

export default SignUpPage;
