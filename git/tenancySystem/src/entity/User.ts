// import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

// @Entity()
// export class User {

//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     firstName: string;

//     @Column()
//     lastName: string;

//     @Column()
//     age: number;

// }

import { Resolver, Query } from "type-graphql";

@Resolver()
export class Hello {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }
}

@Resolver()
export class BookResolver {
  @Query(() => String)
  abcd() {
    return "book resolver";
  }
}
 