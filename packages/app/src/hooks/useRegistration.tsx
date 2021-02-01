import { makeVar, useLazyQuery, useReactiveVar } from "@apollo/client";
import { GetCurrentUserQuery } from "../generated/graphql";
import useAuth from "./useAuth";

import { loader } from "graphql.macro";
import { useEffect } from "react";

export const userVar = makeVar<false | null | GetCurrentUserQuery["user"]>(
  false
);
export const loadingUserVar = makeVar<boolean>(false);

const query = loader("./getCurrentUser.graphql");

export const useUser = () => {
  const user = useReactiveVar(userVar);

  return user;
};

(window as any).userVar = userVar;

export const useRegistration = () => {
  const { isLogged, loading: loadingAuth } = useAuth();
  const user = useReactiveVar(userVar);
  const loadingUser = useReactiveVar(loadingUserVar);

  const [
    getUser,
    { data, error, loading: loadingQuery },
  ] = useLazyQuery<GetCurrentUserQuery>(query);

  useEffect(() => {
    if (isLogged && error && loadingUser) {
      userVar(false);
      loadingUserVar(false);
      return;
    }

    if (isLogged && data && loadingUser) {
      userVar(data.user);
      loadingUserVar(false);
      return;
    }

    if (!isLogged && user) {
      loadingUserVar(false);
      userVar(false);
      return;
    }

    if (isLogged && !loadingUser && user === null) {
      getUser();
      loadingUserVar(true);
      userVar(false);
      return;
    }
  }, [user, isLogged, loadingUser, getUser, data, error]);

  const isLoading = loadingAuth || loadingUser || loadingQuery;

  return {
    user,
    isLoading,
    isLogged: isLoading ? null : isLogged,
    isRegistered: isLoading ? null : !!user,
  };
};
