import { ApolloError } from "apollo-server-cloud-functions";
import { TContext } from "../..";
import {
  Mutation,
  MutationUpdateUserConnectionArgs,
} from "../../../generated/graphql";

async function removeUserConnectionMutation(
  _: any,
  args: MutationUpdateUserConnectionArgs,
  { firestore, database, auth, req }: TContext
): Promise<Mutation["updateUserConnection"]> {
  const tokenId = req.get("Authorization")?.split("Bearer ")[1];

  if (!tokenId) {
    throw new ApolloError("Invalid authorization header");
  }

  const { uid } = await auth.verifyIdToken(tokenId);
  const usernameSnap = await database.ref(`/usernames/${uid}`).get();

  console.log("usernameSnap()", usernameSnap.val());

  return {} as any;
}

export default removeUserConnectionMutation;
