import { ApolloError } from "apollo-server-cloud-functions";
import { TContext } from "../..";
import {
  Mutation,
  MutationDeleteUserPostArgs,
} from "../../../generated/graphql";
import { getUserFromToken } from "../../helpers/getUser";

async function deleteUserPostMutation(
  _: unknown,
  args: MutationDeleteUserPostArgs,
  { database, auth, tokenID }: TContext
): Promise<Mutation["deleteUserPost"]> {
  if (!tokenID) {
    throw new ApolloError("Invalid authorization header");
  }

  const ownUser = await getUserFromToken({ auth, database, tokenID });
  if (!ownUser) {
    throw new ApolloError("User not found");
  }

  const postExists = (
    await database.ref(`/user_posts/${ownUser.username}/${args.id}`).get()
  ).exists();

  if (!postExists) {
    throw new ApolloError("Post not found");
  }

  const deletePost = [
    database.ref(`/user_posts/${ownUser.username}/${args.id}`).remove(),
    database.ref(`/posts/${args.id}`).remove(),
  ];

  await Promise.all(deletePost);

  return {
    ...ownUser,
    posts: [],
  };
}

export default deleteUserPostMutation;
