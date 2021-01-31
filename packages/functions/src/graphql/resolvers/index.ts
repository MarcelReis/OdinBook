import { ApolloError, IResolvers } from "apollo-server-cloud-functions";
import { TContext } from "..";
import {
  CreateUserInput,
  Mutation,
  Query,
  QueryUserArgs,
} from "../../generated/graphql";

import { UserDoc } from "../models/userDoc";

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
      { firestore, auth, req }
    ): Promise<Query["user"]> {
      let doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;

      if (!args.username) {
        const tokenId = req.get("Authorization")?.split("Bearer ")[1];

        if (!tokenId) {
          throw new ApolloError("Invalid authorization header");
        }

        const user = await auth.verifyIdToken(tokenId);

        const querySnapshot = await firestore
          .collection("user")
          .where("uid", "==", user.uid)
          .limit(1)
          .get();

        doc = querySnapshot.docs[0];
      } else {
        const docRef = firestore.collection("user").doc(args.username);
        doc = await docRef.get();
      }

      if (!doc?.exists && args.username === undefined) {
        throw new ApolloError("Registration not finished", "NOT_REGISTERED");
      }
      if (!doc?.exists) {
        throw new ApolloError("User not found", "NOT_FOUND");
      }

      const data = doc.data()! as UserDoc;

      return {
        id: data.uid,
        username: data.username,
        name: data.firstname + " " + data.surname,
        firstname: data.firstname,
        surname: data.surname,
        thumb: data.thumb,
        email: data.email,
        friends: (data.friends as any) ?? [],
      };
    },
  },
  Mutation: {
    async createUser(
      _,
      args: { input: CreateUserInput },
      { firestore, auth, req }
    ): Promise<Mutation["createUser"]> {
      const tokenId = req.get("Authorization")?.split("Bearer ")[1];
      if (!tokenId) {
        throw new ApolloError("Invalid authorization header");
      }

      const { uid, email } = await auth.verifyIdToken(tokenId);

      const userCollection = firestore.collection("user");

      const querySnapshot = await userCollection
        .where("uid", "==", uid)
        .limit(1)
        .get();

      const doc = querySnapshot.docs[0];
      if (doc) {
        throw new ApolloError("User already exists");
      }

      const data: UserDoc = {
        username: args.input.username,
        firstname: args.input.firstname,
        surname: args.input.surname,
        uid,
        thumb: "",
        email: email ?? "",
        friends: [],
        friendRequests: {
          incoming: [],
          outgoing: [],
        },
      };

      await userCollection.doc(args.input.username).set({
        username: args.input.username,
        firstname: args.input.firstname,
        surname: args.input.surname,
        uid,
        email,
      });

      return {
        id: data.uid,
        username: data.username,
        name: data.firstname + " " + data.surname,
        firstname: data.firstname,
        surname: data.surname,
        thumb: data.thumb,
        email: data.email ?? "",
        friends: [],
      };
    },
  },
};
