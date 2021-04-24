import * as functions from "firebase-functions";
import { apolloHandler } from "./graphql";

export const graphql = functions.https.onRequest(apolloHandler);
