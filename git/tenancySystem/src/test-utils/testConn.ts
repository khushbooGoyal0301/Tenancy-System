import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./../entity/User";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: drop,
    dropSchema: drop,
    logging: false,
    entities: [User]
  });
};
