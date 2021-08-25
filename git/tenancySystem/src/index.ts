import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema} from "type-graphql";
import { createConnection } from "typeorm";
import { BookResolver , Hello} from "./entity/User";
createConnection().then(async connection => {
    const app = express();
    // const apolloServer = new ApolloServer({
    //     schema: await buildSchema({
    //     resolvers: [Hello]
    //     })
    // });
    const schema = await buildSchema({
        resolvers: [ BookResolver, Hello] // add this
      })
    const apolloServer = new ApolloServer({ schema })

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("Express server started at localhost:4000");
    });

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