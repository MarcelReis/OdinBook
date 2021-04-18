import * as functions from "firebase-functions";
import { apolloHandler } from "./graphql";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((_, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const graphql = functions.https.onRequest(apolloHandler);
