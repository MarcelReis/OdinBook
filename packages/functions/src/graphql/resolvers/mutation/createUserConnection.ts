import { ApolloError } from "apollo-server-cloud-functions";
import { TContext } from "../..";

import {
  Mutation,
  ConnectionStatus,
  MutationCreateUserConnectionArgs,
} from "../../../generated/graphql";
import { ConnectionObject } from "../../models/UserConnection";

import { getUserFromToken, getUserFromUsername } from "../../helpers/getUser";

async function createUserConnectionMutation(
  _: unknown,
  { username }: MutationCreateUserConnectionArgs,
  { database, auth, tokenID }: TContext
): Promise<Mutation["createUserConnection"]> {
  if (!tokenID) {
    throw new ApolloError("Invalid authorization header");
  }

  const [ownUser, reqUser] = [
    await getUserFromToken({ tokenID, database, auth }),
    await getUserFromUsername({
      username,
      database,
    }),
  ];

  const newConnection: Pick<ConnectionObject, "createdAt" | "acceptedAt"> = {
    createdAt: new Date().toISOString(),
    acceptedAt: null,
  };

  const ownConnection: ConnectionObject = {
    ...newConnection,
    status: ConnectionStatus.Pending,
    userID: ownUser.id,
    firstname: ownUser.firstname,
    surname: ownUser.surname,
  };

  const reqConnection: ConnectionObject = {
    ...newConnection,
    status: ConnectionStatus.Waiting,
    userID: reqUser.id,
    firstname: reqUser.firstname,
    surname: reqUser.surname,
  };

  await Promise.all([
    database.ref(`/connections/${ownUser.username}`).update({
      [reqUser.username]: reqConnection,
    }),
    database.ref(`/connections/${reqUser.username}`).update({
      [ownUser.username]: ownConnection,
    }),
  ]);

  return {
    id: ownUser.id,
    username: ownUser.username,
    firstname: ownUser.firstname,
    surname: ownUser.surname,
  };
}

export default createUserConnectionMutation;
