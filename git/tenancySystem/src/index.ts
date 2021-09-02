import "dotenv/config";
import "reflect-metadata";
import { createServer } from "http";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { createSchema } from "./utils/createSchema";
import {config} from "./config";
import * as cookieParser from "cookie-parser";

import { User } from "./entity/User";
import { verify } from "jsonwebtoken";
//import { RegisterResolver } from "./migrations/User"; 
import { createAccessToken, createRefreshToken } from "./utils/createToken";

//const port = process.env.PORT || 4000;
const cors  = require('cors');
const bodyParser = require('body-parser');

createConnection().then(async connection => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json() , cors())

    const httpServer = createServer(app)
    // const schema = await buildSchema({
    //     resolvers: [ RegisterResolver] // add this
    //   })
    //const apolloServer = new ApolloServer({ schema })

    const schema = await createSchema();
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res })
    });
    app.use(cookieParser());

    app.post("/refresh_token", async (req, res) => {
      const token = req.cookies.khushId;
      if (!token) {
        console.log("token is not valid " + token);
        return res.send({ ok: false, accessToken: "" });
      }
  
      let payload: any = null;
      try {
        payload = await verify(token, process.env.REFRESH_TOKEN_SECRET!);
      } catch (err) {
        console.log(err);
        return res.send({ ok: false, accessToken: "" });
      }
      console.log("payload :: " + payload.userId);
      //token is valid and we can send him access token now.abnf
      const user = await User.findOne({ id: payload.userId });
  
      if (!user) {
        console.log("User not found");
        return res.send({ ok: false, accessToken: "" });
      }
  
      if (user.tokenVersion !== payload.tokenVersion) {
        return res.send({ ok: false, accessToken: "" });
      }
  
      //Referesh Token
      res.cookie("khushId", createRefreshToken(user), {
        httpOnly: true
      });
  
      return res.send({ ok: true, accessToken: createAccessToken(user) });
    });
  
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    
    httpServer.listen({port: config.port || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`),
    );

}).catch(error => console.log(error));

