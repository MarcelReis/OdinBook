import { ApolloError } from "apollo-server-cloud-functions";
import { TContext } from "../..";
import { Mutation, MutationCreateUserArgs } from "../../../generated/graphql";
import { getUserFromToken } from "../../helpers/getUser";
import { UserDocBasicInfo } from "../../models/User";

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

  const { uid, picture } = await auth.verifyIdToken(tokenID);

  const newUser: UserDocBasicInfo = {
    id: uid,
    username: args.input.username,
    firstname: args.input.firstname,
    surname: args.input.surname,
    thumb: picture ?? "https://placekitten.com/50",
  };
  const usernameRef = databaseRef.child("usernames");
  const usersRef = databaseRef.child("users");

  await Promise.all([
    usersRef.update({ [newUser.username]: { ...newUser } }),
    usernameRef.update({ [uid]: newUser.username }),
  ]);

  return {
    id: newUser.id,
    username: newUser.username,
    firstname: newUser.firstname,
    surname: newUser.surname,
    connections: [],
  };
}

export default createUserMutation;
