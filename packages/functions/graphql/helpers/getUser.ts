import { auth, database } from "firebase-admin";
import { UserDocBasicInfo } from "../models/User";

export const getUserFromToken = async ({
  auth,
  database,
  tokenID,
}: {
  auth: auth.Auth;
  database: database.Database;
  tokenID: string;
}): Promise<UserDocBasicInfo | null> => {
  const { uid } = await auth.verifyIdToken(tokenID);

  const username = (await database.ref(`/usernames/${uid}`).get()).val();

  return await getUserFromUsername({ username, database });
};

export const getUserFromUsername = async ({
  username,
  database,
}: {
  username: string;
  database: database.Database;
}): Promise<UserDocBasicInfo | null> => {
  const snapshot = await database.ref(`/users/${username}`).get();

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.val();
};
