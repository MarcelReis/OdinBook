import { ApolloError } from "apollo-server-cloud-functions";
import { TContext } from "../..";
import {
  Mutation,
  MutationUpdateUserConnectionArgs,
} from "../../../generated/graphql";

import { getUserFromToken } from "../../helpers/getUser";

async function removeUserConnectionMutation(
  _: unknown,
  _args: MutationUpdateUserConnectionArgs,
  { database, auth, tokenID }: TContext
): Promise<Mutation["updateUserConnection"]> {
  if (!tokenID) {
    throw new ApolloError("Invalid authorization header");
  }

  const currentUser = await getUserFromToken({ database, auth, tokenID });
  console.log("currentUser", currentUser);

  return {} as any;
}

export default removeUserConnectionMutation;
