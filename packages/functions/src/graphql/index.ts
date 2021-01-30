import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as fs from "fs";
import * as path from "path";
import { ApolloServer, gql } from "apollo-server-cloud-functions";

import { resolvers } from "./resolvers";

admin.initializeApp();

const schemaString = fs
  .readFileSync(path.join(__dirname, "../../../../schema.graphql"), "utf-8")
  .toString();

const typeDefs = gql(schemaString);

export type TContext = {
  firestore: FirebaseFirestore.Firestore;
  req: functions.https.Request;
  res: functions.Response;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: ({
    req,
    res,
  }: {
    req: functions.https.Request;
    res: functions.Response;
  }): TContext => ({
    firestore: admin.firestore(),
    req,
    res,
  }),
});

export const apolloHandler = server.createHandler({ cors: { origin: true } });
