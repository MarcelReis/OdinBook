import { TContext } from "../..";

async function helloResolver(
  _: any,
  args: void,
  { firestore, database, auth, req }: TContext
) {
  return "Hello world!";
}

export default helloResolver;
