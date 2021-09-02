import { Resolver, Query, Mutation, Arg} from "type-graphql";
import { User } from "../../../entity/User";
//import bcrypt from "bcrypt";
const bcrypt = require('bcryptjs');
import { RegisterInputType } from "./RegisterInputType";

@Resolver()
export class RegisterResolver 
{
  @Query(() => String)
  async hello() {
    return "hello11";
  }
 
  @Query(() => [User])
  users() {
    return User.find()
  }

  @Query((returns) => [User])
  public async user(): Promise<User[]> {
      return await User.find();
  }

  @Mutation(() => User)
  async register(
    @Arg("data")
    registerInput: RegisterInputType
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerInput.password, 10);
    registerInput.password = hashedPassword;
    const user = await User.create(registerInput).save();
    return user;
  }

  // @Mutation(() => User)
  // async register(@Arg("data") data: RegisterInputType
  //  @Arg("name") name: string,
  //   @Arg("email") email: string,
  //   @Arg("password") password: string) {
  //   const user =  await User.create(data).save();
  //   return user;
  // }
  
  // @Mutation(() => User)
  // async register(
  //   @Arg("data")
  //   data: RegisterInputType
  //   ) {
  //   const user = User.create(data);
  //   await user.save();
  //   return user;
  // }

  // mutation {
  //   register(
  //     data:
  //         {
  //             name : "khushboo",
  //             email: "khushboogoyal@gmail.com",
  //             password : "123456"
  //         }
  //     )
  //     {
  //        id
  //        name
  //        email
  //        password    
  //     }
  // }

  // @Resolver()
    // export class Hello {
    //   @Query(() => String)
    //   async hello() {
    //     return "Hello World";
    //   }
    // }

    // @Resolver()
    // export class BookResolver {
    //   @Query(() => String)
    //   abcd() {
    //     return "book resolver";
    //   }
    // }

}