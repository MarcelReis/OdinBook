import { ApolloError } from "apollo-server-cloud-functions";
import { TContext } from "../..";
import { CreateUserInput, User_Full } from "../../../generated/graphql";
import { UserDoc, UserDocBasicInfo } from "../../models/userDoc";

async function createUserMutation(
  _: any,
  args: { input: CreateUserInput },
  { firestore, database, auth, req }: TContext
): Promise<User_Full> {
  const tokenId = req.get("Authorization")?.split("Bearer ")[1];
  if (!tokenId) {
    throw new ApolloError("Invalid authorization header");
  }

  const { uid, email } = await auth.verifyIdToken(tokenId);

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

  const usersRef = database.child("users");
  await usersRef.update({ [basic_data.username]: { ...basic_data } });

  return {
    id: full_data.id,
    username: full_data.username,
    name: full_data.firstname + " " + full_data.surname,
    firstname: full_data.firstname,
    surname: full_data.surname,
    thumb: full_data.thumb,
    email: full_data.email ?? "",
    friends: [],
  };
}

export default createUserMutation;
