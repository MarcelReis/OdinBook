import "firebase/auth";
import { makeVar, useReactiveVar } from "@apollo/client";

import firebase from "../../firebase";
import { userVar } from "./_apolloVars";

const isLoadingVar = makeVar(true);
const firebaseUserVar = makeVar<null | firebase.User>(null);

firebaseUserVar.onNextChange(async (user) => {
  const tokenID = await user?.getIdToken();
  localStorage.setItem("tokenID", tokenID || "");
});

const auth = firebase.auth();

if (process.env.NODE_ENV !== "production") {
  auth.useEmulator("http://localhost:9099");
}

const facebookProvider = new firebase.auth.FacebookAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

auth.onAuthStateChanged(async (user) => {
  const tokenID = await user?.getIdToken();

  if (tokenID) {
    localStorage.setItem("tokenID", tokenID);
  } else {
    localStorage.removeItem("tokenID");
  }

  if (user) {
    userVar(null);
  }

  firebaseUserVar(user);

  if (isLoadingVar()) {
    isLoadingVar(false);
  }
});

const useAuth = () => {
  const user = useReactiveVar(firebaseUserVar);
  const loading = useReactiveVar(isLoadingVar);

  return {
    isLogged: !!user,
    loading,
    logout: () => auth.signOut(),

    mailLogin: (email: string, password: string) => {
      isLoadingVar(true);
      auth.signInWithEmailAndPassword(email, password);
    },

    facebookLogin: () => {
      isLoadingVar(true);
      auth.signInWithRedirect(facebookProvider);
    },

    githubLogin: () => {
      isLoadingVar(true);
      auth.signInWithRedirect(githubProvider);
    },

    googleLogin: () => {
      isLoadingVar(true);
      auth.signInWithRedirect(googleProvider);
    },
  };
};

export default useAuth;
