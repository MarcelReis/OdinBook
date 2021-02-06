import { ConnectionStatus } from "../../generated/graphql";

export type ConnectionObject = {
  userID: string;
  firstname: string;
  surname: string;

  status: ConnectionStatus;
  createdAt: string;
  acceptedAt: string | null;
};

export type ConnectionsObject = Record<string, ConnectionObject>;
