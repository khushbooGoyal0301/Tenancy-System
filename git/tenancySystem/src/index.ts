import "reflect-metadata";
import { createServer } from "http";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema} from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./migrations/User";
const port = process.env.PORT|| 4000;
const path  = require('path');
const cors  = require('cors');
const bodyParser = require('body-parser')
createConnection().then(async connection => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json() , cors())

    const httpServer = createServer(app)
    const schema = await buildSchema({
        resolvers: [ RegisterResolver] // add this
      })
    const apolloServer = new ApolloServer({ schema })

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    
    httpServer.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`),
    );

}).catch(error => console.log(error));


// import "reflect-metadata";
// import {createConnection} from "typeorm";
// import {User} from "./entity/User";
// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));

// createConnection().then(async connection => {
//     const app = express();
//     const apolloServer = new ApolloServer({
//         schema: await buildSchema({
//         resolvers: [User]
//         })
//     });
//     apolloServer.applyMiddleware({ app });
//     app.listen(4000, () => {
//         console.log("Express server started at localhost:4000");
//     });

//     const user = new User();
    
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

// }).catch(error => console.log(error));