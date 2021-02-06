import { ApolloError } from "apollo-server-cloud-functions";
import { TContext } from "../..";
import { Mutation, MutationCreatePostArgs } from "../../../generated/graphql";
import { getUserFromToken } from "../../helpers/getUser";
import { PostDoc } from "../../models/Post";

async function createPostMutation(
  _: any,
  args: MutationCreatePostArgs,
  { database, auth, tokenID }: TContext
): Promise<Mutation["createUser"]> {
  if (!tokenID) {
    throw new ApolloError("Invalid authorization header");
  }

  const ownUser = await getUserFromToken({ auth, database, tokenID });

  const post: PostDoc = {
    user: ownUser,
    createdAt: new Date().toISOString(),
    content: args.content,
  };

  const postSnapShot = await database.ref("/posts").push(post);
  if (!postSnapShot.key) {
    throw new ApolloError("Error creating post");
  }

  await database
    .ref(`/user_posts/${ownUser.username}`)
    .update({ [postSnapShot.key]: true });

  return {
    ...ownUser,
    posts: [
      {
        id: postSnapShot.key!,
        user: ownUser,
        content: post.content,
        comments: [],
        likes: [],
        createdAt: post.createdAt,
      },
    ],
  };
}

export default createPostMutation;
