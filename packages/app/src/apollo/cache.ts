import { FieldFunctionOptions, InMemoryCache } from "@apollo/client";
import { ConnectionStatus, User } from "../generated/graphql";
import { userVar } from "../lib/odinAuth/_apolloVars";

const UserFields = {
  connectionStatus: {
    read(
      _: any,
      { readField }: FieldFunctionOptions
    ): User["connectionStatus"] {
      const currentUser = userVar();
      if (!currentUser) {
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
};

export const cache = new InMemoryCache({
  typePolicies: {
    User: { fields: { ...UserFields } },
    User_Full: { fields: { ...UserFields } },
    User_Basic: { fields: { ...UserFields } },
  },
});
