import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { QueryCreateAccountQuery } from "../../generated/graphql";

export const queryCreateAccount = loader("./QueryCreateAccount.graphql");

const LoginPage = () => {
  const [creatingAccount, setCreatingAccount] = useState(false);

  const [load, result] = useLazyQuery<QueryCreateAccountQuery>(
    queryCreateAccount
  );

  const createAccount = () => {
    !result.called && load();
    setCreatingAccount(true);
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

        <button onClick={createAccount}>Create New Account</button>
      </div>

      {creatingAccount && (
        <div>
          <form action="">
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
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
