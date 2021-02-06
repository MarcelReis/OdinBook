import { IResolvers } from "apollo-server-cloud-functions";
import { TContext } from "..";

import helloResolver from "./query/hello";
import userResolver from "./query/user";
import usersResolver from "./query/users";

import createUserMutation from "./mutation/createUser";
import createUserConnectionMutation from "./mutation/createUserConnection";
import updateUserConnectionMutation from "./mutation/updateUserConnection";
import removeUserConnectionMutation from "./mutation/removeUserConnection";

import { ConnectionsObject } from "../models/UserConnection";
import { UserConnection } from "../../generated/graphql";
import { userConnectionsToGraph } from "../helpers/transformToGraph";

export const resolvers: IResolvers<void, TContext> = {
  Query: {
    hello: helloResolver,
    user: userResolver,
    users: usersResolver,
  },
  Mutation: {
    createUser: createUserMutation,
    createUserConnection: createUserConnectionMutation,
    updateUserConnection: updateUserConnectionMutation,
    removeUserConnection: removeUserConnectionMutation,
  },
  User: {
    async connections(parent: any, _, ctx): Promise<UserConnection[]> {
      const snapshot = await ctx.database
        .ref(`/connections/${parent.username}`)
        .get();

      const data = snapshot.val() as ConnectionsObject;

      if (!data) {
        return [];
      }

      return userConnectionsToGraph(data, parent.username);
    },
  },
};
