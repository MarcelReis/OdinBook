import "firebase/auth";
import { makeVar, useReactiveVar } from "@apollo/client";

import firebase from "../firebase";

const isLoading = makeVar(true);
const currentUser = makeVar<null | firebase.User>(null);

const auth = firebase.auth();

const facebookProvider = new firebase.auth.FacebookAuthProvider();

auth.onAuthStateChanged((user) => {
  if (isLoading()) {
    isLoading(false);
  }

  currentUser(user);
});

const useAuth = () => {
  const user = useReactiveVar(currentUser);
  const loading = useReactiveVar(isLoading);

  return {
    isLogged: !!user,
    loading,
    login: () => null,

    facebookLogin: () => auth.signInWithPopup(facebookProvider),
    logout: () => auth.signOut(),
  };
};

export default useAuth;
