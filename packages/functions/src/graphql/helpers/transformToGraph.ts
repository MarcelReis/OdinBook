import { FriendConnection } from "../../generated/graphql";
import { ConnectionsObject } from "../models/Connection";

export const friendConnectionsToGraph = (
  doc: ConnectionsObject,
  parentUsername: string
): FriendConnection[] => {
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
