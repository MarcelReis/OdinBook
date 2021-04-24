import { TContext } from "../..";
import { Query } from "../../../generated/graphql";
import { PostDoc } from "../../models/Post";

async function postsResolver(
  _: any,
  _args: void,
  { database }: TContext
): Promise<Query["posts"] | undefined> {
  const postsSnapShot = await database
    .ref("/posts")
    .orderByChild("createdAt")
    .get();

  const data = postsSnapShot.val() as Record<string, PostDoc>;

  const posts = Object.entries(data)
    .reverse()
    .map(([key, data]) => ({
      id: key,
      user: data.user,
      createdAt: data.createdAt,
      content: data.content,
      likes: [],
      comments: [],
    }));

  return posts;
}

export default postsResolver;
