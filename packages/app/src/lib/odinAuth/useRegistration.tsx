import { useReactiveVar } from "@apollo/client";
import { useGetCurrentUserLazyQuery } from "../../generated/graphql";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { loadingUserVar, userVar } from "./_apolloVars";

const useRegistration = () => {
  const { isLogged, loading: loadingAuth } = useAuth();
  const user = useReactiveVar(userVar);
  const loadingUser = useReactiveVar(loadingUserVar);

  const [
    getUser,
    { data, error, loading: loadingQuery },
  ] = useGetCurrentUserLazyQuery();

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

export default useRegistration;
