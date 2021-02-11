import { ApolloError } from "apollo-server-cloud-functions";
import { TContext } from "../..";
import { Mutation, MutationCreateUserArgs } from "../../../generated/graphql";
import { getUserFromToken } from "../../helpers/getUser";
import { UserDoc, UserDocBasicInfo } from "../../models/User";

async function createUserMutation(
  _: any,
  args: MutationCreateUserArgs,
  { database, auth, tokenID }: TContext
): Promise<Mutation["createUser"]> {
  if (!tokenID) {
    throw new ApolloError("Invalid authorization header");
  }

  const databaseRef = database.ref("/");

  const user = await getUserFromToken({ auth, database, tokenID });
  if (user) {
    throw new ApolloError("User already exists");
  }

  const { uid, email } = await auth.verifyIdToken(tokenID);

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

  const usersRef = databaseRef.child("users");
  await usersRef.update({ [basic_data.username]: { ...basic_data } });

  const usernameRef = databaseRef.child("usernames");
  await usernameRef.update({ [uid]: basic_data.username });

  return {
    id: full_data.id,
    username: full_data.username,
    firstname: full_data.firstname,
    surname: full_data.surname,
    connections: [],
  };
}

export default createUserMutation;
