import { IResolvers } from "apollo-server-cloud-functions";
import { TContext } from "..";

import helloResolver from "./query/hello";
import userResolver from "./query/user";
import usersResolver from "./query/users";

import createUserMutation from "./mutation/createUser";

export const resolvers: IResolvers<void, TContext> = {
  Query: {
    hello: helloResolver,
    user: userResolver,
    users: usersResolver,
  },
  Mutation: {
    createUser: createUserMutation,
  },
  User: {
    __resolveType(user: any) {
      if (user.name) {
        return "User_Full";
      }

      return "User_Basic";
    },
  },
};
