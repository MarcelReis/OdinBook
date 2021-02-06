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
}): Promise<UserDocBasicInfo> => {
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
}): Promise<UserDocBasicInfo> => {
  const snapshot = await database.ref(`/users/${username}`).get();

  return snapshot.val();
};
