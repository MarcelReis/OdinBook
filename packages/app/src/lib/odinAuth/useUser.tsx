import { useReactiveVar } from "@apollo/client";
import { userVar } from "./_apolloVars";

const useUser = () => {
  const user = useReactiveVar(userVar);

  return user;
};

export default useUser;
