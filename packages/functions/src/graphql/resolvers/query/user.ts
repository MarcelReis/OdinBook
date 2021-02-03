import { Query, QueryUserArgs } from "../../../generated/graphql";
import { ApolloError } from "apollo-server-cloud-functions";

import { TContext } from "../..";
import { UserDoc } from "../../models/userDoc";

async function userResolver(
  _: any,
  args: QueryUserArgs,
  { firestore, auth, req }: TContext
): Promise<Omit<Query["user"], "connections">> {
  let doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;

  if (!args.username) {
    const tokenId = req.get("Authorization")?.split("Bearer ")[1];

    if (!tokenId) {
      throw new ApolloError("Invalid authorization header");
    }

    const { uid } = await auth.verifyIdToken(tokenId);

    const querySnapshot = await firestore
      .collection("user")
      .where("id", "==", uid)
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
    id: data.id,
    username: data.username,
    name: data.firstname + " " + data.surname,
    firstname: data.firstname,
    surname: data.surname,
    thumb: data.thumb,
    email: data.email,
  };
}

export default userResolver;
