import { ApolloError } from "apollo-server-cloud-functions";
import { TContext } from "../..";

import {
  Mutation,
  CreateFriendConnectionInput,
  ConnectionStatus,
} from "../../../generated/graphql";
import { ConnectionObject } from "../../models/Connection";

import { getUserFromToken, getUserFromUsername } from "../../helpers/getUser";

async function createFriendConnectionMutation(
  _: any,
  { input }: { input: CreateFriendConnectionInput },
  { database, auth, tokenID }: TContext
): Promise<Mutation["createFriendConnection"]> {
  if (!tokenID) {
    throw new ApolloError("Invalid authorization header");
  }

  const [ownUser, reqUser] = [
    await getUserFromToken({ tokenID, database, auth }),
    await getUserFromUsername({
      username: input.username,
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

  database.ref(`/connections/${ownUser.username}`).update({
    [reqUser.username]: reqConnection,
  });

  database.ref(`/connections/${reqUser.username}`).update({
    [ownUser.username]: ownConnection,
  });

  return { id: ownUser.id, connections: [ownConnection] } as any;
}

export default createFriendConnectionMutation;
