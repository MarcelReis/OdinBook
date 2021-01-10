import "firebase/auth";
import { makeVar, useReactiveVar } from "@apollo/client";

import firebase from "../firebase";

const isLoading = makeVar(true);
const currentUser = makeVar<null | firebase.User>(null);

const auth = firebase.auth();

const facebookProvider = new firebase.auth.FacebookAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

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
    logout: () => auth.signOut(),

    facebookLogin: () => auth.signInWithPopup(facebookProvider),
    githubLogin: () => auth.signInWithPopup(githubProvider),
    googleLogin: () => auth.signInWithPopup(googleProvider),
  };
};

export default useAuth;
