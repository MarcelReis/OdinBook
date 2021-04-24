import { Query, QueryUserArgs } from "../../../generated/graphql";
import { ApolloError } from "apollo-server-cloud-functions";

import { TContext } from "../..";
import { getUserFromToken, getUserFromUsername } from "../../helpers/getUser";

async function userResolver(
  _: any,
  args: QueryUserArgs,
  { database, auth, tokenID }: TContext
): Promise<Query["user"]> {
  if (args.username) {
    const user = await getUserFromUsername({
      username: args.username,
      database,
    });

    if (!user) {
      throw new ApolloError("Not found");
    }

    return { ...user };
  }

  if (!tokenID) {
    throw new ApolloError("Missing Autorization");
  }

  const user = await getUserFromToken({ tokenID, auth, database });
  if (!user) {
    throw new ApolloError("User not found", "NOT_FOUND");
  }

  return user;
}

export default userResolver;
