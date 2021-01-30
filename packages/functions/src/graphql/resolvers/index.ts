import { IResolvers } from "apollo-server-cloud-functions";
import { TContext } from "..";
import { Query, QueryUserArgs } from "../../generated/graphql";

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
      console.log("args", args);

      let doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;

      if (!args.username) {
        const tokenId = req.get("Authorization")?.split("Bearer ")[1];

        if (!tokenId) {
          throw "Invalid authorization header";
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
