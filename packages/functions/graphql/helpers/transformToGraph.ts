import { UserConnection } from "../../generated/graphql";
import { ConnectionsObject } from "../models/UserConnection";

export const userConnectionsToGraph = (
  doc: ConnectionsObject,
  parentUsername: string
): UserConnection[] => {
  return Object.entries(doc).map(([username, data]) => ({
    id: `UC-${parentUsername}#${username}`,
    user: {
      id: data.userID,
      username,
      firstname: data.firstname,
      surname: data.surname,
    },
    createdAt: data.createdAt,
    acceptedAt: data.acceptedAt,
    status: data.status,
  }));
};
