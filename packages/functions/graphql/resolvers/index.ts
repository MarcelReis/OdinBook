import { IResolvers } from "apollo-server-cloud-functions";
import { TContext } from "..";

import postsResolver from "./query/posts";
import helloResolver from "./query/hello";
import userResolver from "./query/user";
import usersResolver from "./query/users";

import createUserMutation from "./mutation/createUser";
import createUserConnectionMutation from "./mutation/createUserConnection";
import updateUserConnectionMutation from "./mutation/updateUserConnection";
import deleteUserConnectionMutation from "./mutation/deleteUserConnection";
import createPostMutation from "./mutation/createPost";
import deleteUserPostMutation from "./mutation/deleteUserPost";

import { ConnectionsObject } from "../models/UserConnection";
import { User } from "../../generated/graphql";
import { userConnectionsToGraph } from "../helpers/transformToGraph";
import { PostDoc } from "../models/Post";

export const resolvers: IResolvers<any, TContext> = {
  Query: {
    hello: helloResolver,
    user: userResolver,
    users: usersResolver,
    posts: postsResolver,
  },
  Mutation: {
    createUser: createUserMutation,

    createUserConnection: createUserConnectionMutation,
    updateUserConnection: updateUserConnectionMutation,
    deleteUserConnection: deleteUserConnectionMutation,

    createPost: createPostMutation,
    deleteUserPost: deleteUserPostMutation,
  },
  User: {
    async connections(parent: User, _, ctx): Promise<User["connections"]> {
      if (parent.connections) {
        return parent.connections;
      }

      const snapshot = await ctx.database
        .ref(`/connections/${parent.username}`)
        .get();

      const data = snapshot.val() as ConnectionsObject;
      if (!data) {
        return [];
      }

      return userConnectionsToGraph(data, parent.username);
    },
    async posts(parent: User, _, ctx): Promise<User["posts"]> {
      if (parent.posts) {
        return parent.posts;
      }

      const { uid } = ctx.tokenID
        ? await ctx.auth.verifyIdToken(ctx.tokenID)
        : ({} as any);

      const postIDsSnapshot = await ctx.database
        .ref(`/user_posts/${parent.username}`)
        .get();
      if (!postIDsSnapshot.exists()) {
        return null;
      }
      const postsIDs = Object.keys(postIDsSnapshot.val());

      const postsPromises = postsIDs.map(async (postID) => ({
        id: postID,
        ...(await (await ctx.database.ref(`/posts/${postID}`).get()).val()),
      })) as Promise<PostDoc & { id: string }>[];

      const postsData = await Promise.all(postsPromises);

      return postsData.reverse().map((data) => ({
        id: data.id,
        owner: data.user.id === uid,
        user: data.user,
        createdAt: data.createdAt,
        content: data.content,
        likes: [],
        comments: [],
      }));
    },
  },
};
