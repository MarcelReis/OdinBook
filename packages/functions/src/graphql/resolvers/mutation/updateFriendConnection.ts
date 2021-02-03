import { ApolloError } from "apollo-server-cloud-functions";
import { TContext } from "../..";
import {
  Mutation,
  UpdateFriendConnectionInput,
} from "../../../generated/graphql";

async function updateFriendConnectionMutation(
  _: any,
  args: { input: UpdateFriendConnectionInput },
  { firestore, database, auth, req }: TContext
): Promise<Mutation["updateFriendConnection"]> {
  const tokenId = req.get("Authorization")?.split("Bearer ")[1];

  if (!tokenId) {
    throw new ApolloError("Invalid authorization header");
  }

  const { uid } = await auth.verifyIdToken(tokenId);
  const usernameSnap = await database.ref(`/usernames/${uid}`).get();

  console.log("usernameSnap()", usernameSnap.val());

  return {} as any;
}

export default updateFriendConnectionMutation;
