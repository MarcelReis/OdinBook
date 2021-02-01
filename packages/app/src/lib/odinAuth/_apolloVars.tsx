import { makeVar } from "@apollo/client";
import { GetCurrentUserQuery } from "../../generated/graphql";

export const userVar = makeVar<false | null | GetCurrentUserQuery["user"]>(
  false
);

export const loadingUserVar = makeVar<boolean>(false);
