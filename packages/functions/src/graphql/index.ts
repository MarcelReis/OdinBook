import { ApolloServer, gql } from "apollo-server-cloud-functions";
import * as fs from "fs";
import * as path from "path";

const schemaString = fs
  .readFileSync(path.join(__dirname, "../../../../schema.graphql"), "utf-8")
  .toString();

const typeDefs = gql(schemaString);

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

export const apolloHandler = server.createHandler({ cors: { origin: true } });
