import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  QueryCreateAccountQuery,
} from "../../generated/graphql";

export const queryCreateAccount = loader("./QueryCreateAccount.graphql");
export const mutationCreateAccount = loader("./MutationCreateAccont.graphql");

const LoginPage = () => {
  const [creatingAccount, setCreatingAccount] = useState(false);

  const [load, result] = useLazyQuery<QueryCreateAccountQuery>(
    queryCreateAccount
  );
  const [createAccont] = useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(mutationCreateAccount);

  const openCreateAccount = () => {
    !result.called && load();
    setCreatingAccount(true);
  };

  const createAccountSubmitHandler = async () => {
    await createAccont({});
  };

  return (
    <>
      <div>
        <form>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" />

          <label htmlFor="password">Password</label>
          <input id="password" type="text" />

          <button>Continue with Facebook</button>
          <button type="submit">Log In</button>
        </form>
        <hr />

        <button onClick={openCreateAccount}>Create New Account</button>
      </div>

      {creatingAccount && (
        <div>
          <form onSubmit={createAccountSubmitHandler}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" />

            <label htmlFor="surname">Surname</label>
            <input type="text" id="surname" />

            <label htmlFor="deity">Deity</label>
            <select name="cars" id="deity" disabled>
              {!result.data ? (
                <option value="">Loading...</option>
              ) : (
                result.data.deities.map((deity) => (
                  <option key={deity.uri} value={deity.uri}>
                    {deity.name}
                  </option>
                ))
              )}
            </select>

            <label htmlFor="email-create">Email</label>
            <input type="email" id="email-create" />

            <label htmlFor="password-create">Password</label>
            <input type="password" id="password-create" />

            <button type="submit">Create</button>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
