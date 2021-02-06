import { ApolloError } from "apollo-server-cloud-functions";
import { TContext } from "../..";
import {
  ConnectionStatus,
  Mutation,
  MutationUpdateUserConnectionArgs,
} from "../../../generated/graphql";

import { getUserFromToken, getUserFromUsername } from "../../helpers/getUser";

async function updateUserConnectionMutation(
  _: unknown,
  args: MutationUpdateUserConnectionArgs,
  { database, auth, tokenID }: TContext
): Promise<Mutation["updateUserConnection"]> {
  if (!tokenID) {
    throw new ApolloError("Invalid authorization header");
  }

  const [ownUser, connectionUser] = [
    await getUserFromToken({ database, auth, tokenID }),
    await getUserFromUsername({
      username: args.username,
      database,
    }),
  ];

  if (args.status === ConnectionStatus.Connected) {
    const connection = {
      status: ConnectionStatus.Connected,
      acceptedAt: new Date().toISOString(),
    };

    Promise.all([
      await database
        .ref(`/connections/${ownUser.username}/${connectionUser.username}`)
        .update(connection),
      await database
        .ref(`/connections/${connectionUser.username}/${ownUser.username}`)
        .update(connection),
    ]);
  }

  return {
    id: ownUser.id,
    username: ownUser.username,
    firstname: ownUser.firstname,
    surname: ownUser.surname,
  };
}

export default updateUserConnectionMutation;
