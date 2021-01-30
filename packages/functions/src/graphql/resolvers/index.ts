import { IResolvers } from "apollo-server-cloud-functions";
import { TContext } from "..";
import { Query, QueryUserArgs } from "../../generated/graphql";

export const resolvers: IResolvers<void, TContext> = {
  Query: {
    async hello(
      parent: any,
      args: any,
      { firestore }
    ): Promise<Query["hello"]> {
      return "Hello world";
    },

    async user(
      parent: any,
      args: QueryUserArgs,
      { firestore }
    ): Promise<Query["user"]> {
      const docRef = firestore.collection("user").doc(args.username);

      const doc = await docRef.get();
      if (!doc.exists) {
        throw "No such user!";
      }

      const data = doc.data()! as UserDoc;

      return {
        id: `UN-${data.username}`,
        username: data.username,
        name: data.name,
        surname: data.surname,
        thumb: data.thumb,
        email: data.email,
        friends: (data.friends as any) ?? [],
      };
    },
  },
};
