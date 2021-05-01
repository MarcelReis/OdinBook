import { InMemoryCache } from "@apollo/client";
import { ConnectionStatus, User } from "../generated/graphql";
import { userVar } from "../lib/odinAuth/_apolloVars";

export const createCache = () =>
  new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          connectionStatus: {
            read(_, { readField }): User["connectionStatus"] {
              const currentUser = userVar();
              if (!currentUser || !currentUser.connections) {
                return null;
              }

              const parentUsername = readField("username");

              if (parentUsername === currentUser.username) {
                return ConnectionStatus.Self;
              }

              const connection = currentUser.connections.find(
                ({ user }) => user.username === parentUsername
              );

              return connection?.status ?? null;
            },
          },
          name: {
            read(_, { readField }) {
              return `${readField("firstname")} ${readField("surname")}`;
            },
          },
          posts: {
            merge(existing = [], incoming: unknown[] | undefined, options) {
              if (options?.variables?.username) {
                return incoming;
              }

              return incoming ? [...incoming, ...existing] : existing;
            },
          },
        },
      },
    },
  });

export const cache = createCache();
