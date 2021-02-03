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

const database = admin.database();

export type TContext = {
  firestore: FirebaseFirestore.Firestore;
  database: admin.database.Database;
  auth: admin.auth.Auth;
  req: functions.https.Request;
  res: functions.Response;
  tokenID?: string;
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
    database,
    auth: admin.auth(),
    req,
    res,
    tokenID: req.get("Authorization")?.split("Bearer ")[1],
  }),
});

export const apolloHandler = server.createHandler({ cors: { origin: true } });
