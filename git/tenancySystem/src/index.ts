import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as  Express from "express";
import { createConnection } from "typeorm";
import { createSchema } from "./utils/createSchema";

const server = async () => {
  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Dev.to server started on localhost:4000/graphql");
  });
};

server();
