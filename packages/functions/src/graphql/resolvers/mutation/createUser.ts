import { ApolloError } from "apollo-server-cloud-functions";
import { TContext } from "../..";
import { Mutation, MutationCreateUserArgs } from "../../../generated/graphql";
import { UserDoc, UserDocBasicInfo } from "../../models/User";

async function createUserMutation(
  _: any,
  args: MutationCreateUserArgs,
  { firestore, database, auth, tokenID }: TContext
): Promise<Mutation["createUser"]> {
  const databaseRef = database.ref("/");

  if (!tokenID) {
    throw new ApolloError("Invalid authorization header");
  }

  const { uid, email } = await auth.verifyIdToken(tokenID);

  const userCollection = firestore.collection("user");

  const querySnapshot = await userCollection
    .where("id", "==", uid)
    .limit(1)
    .get();

  const doc = querySnapshot.docs[0];
  if (doc) {
    throw new ApolloError("User already exists");
  }

  const basic_data: UserDocBasicInfo = {
    id: uid,
    username: args.input.username,
    firstname: args.input.firstname,
    surname: args.input.surname,
    thumb: "",
  };

  const full_data: UserDoc = {
    ...basic_data,
    email: email ?? "",
    friends: [],
    friendRequests: {
      incoming: [],
      outgoing: [],
    },
  };

  await userCollection.doc(args.input.username).set(full_data);

  const usersRef = databaseRef.child("users");
  await usersRef.update({ [basic_data.username]: { ...basic_data } });

  const usernameRef = databaseRef.child("usernames");
  await usernameRef.update({ [uid]: basic_data.username });

  return {
    id: full_data.id,
    username: full_data.username,
    firstname: full_data.firstname,
    surname: full_data.surname,
    thumb: full_data.thumb,
    email: full_data.email ?? "",
    connections: [],
  };
}

export default createUserMutation;
