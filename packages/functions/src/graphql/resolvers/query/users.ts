import { Query, QueryUserArgs } from "../../../generated/graphql";

import { TContext } from "../..";
import { UserDocBasicInfo } from "../../models/userDoc";

async function usersResolver(
  _: any,
  args: QueryUserArgs,
  { database }: TContext
): Promise<Query["users"]> {
  const usersRef = database.child("users");

  const snapshot = await usersRef.get();

  const data = snapshot.val() as Record<
    UserDocBasicInfo["username"],
    Omit<UserDocBasicInfo, "username">
  >;

  return Object.entries(data).map(([key, value]) => ({
    ...value,
    username: key,
  }));
}

export default usersResolver;
