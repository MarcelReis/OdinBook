import { TContext } from "../..";
import {
  Mutation,
  MutationDeleteUserPostArgs,
} from "../../../generated/graphql";

async function deleteUserPostMutation(
  _: unknown,
  args: MutationDeleteUserPostArgs,
  { database, auth, tokenID }: TContext
): Promise<Mutation["deleteUserPost"]> {
  console.log("args", args);
  console.log("database, auth, tokenID", database, auth, tokenID);

  return undefined as any;
}

export default deleteUserPostMutation;
