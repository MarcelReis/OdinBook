import { TContext } from "../..";
import { Query } from "../../../generated/graphql";

async function postsResolver(
  _: any,
  args: void,
  { firestore, database, auth, req }: TContext
): Promise<Query["posts"]> {
  return [];
}

export default postsResolver;
