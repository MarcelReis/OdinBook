import { makeVar, useReactiveVar } from "@apollo/client";

const loginStatus = makeVar(false);

const useAuth = () => {
  const isLogged = useReactiveVar(loginStatus);

  return { isLogged, login: () => loginStatus(true) };
};

export default useAuth;
