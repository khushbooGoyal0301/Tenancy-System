
import { Resolver, Query, Mutation, Arg} from "type-graphql";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import { RegisterInputType } from "./RegisterInputType";

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

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "hello11";
  }
 
  
  @Query(() => [User])
  users() {
    return User.find()
  }
  

  // @Mutation(() => User)
  // async register(@Arg("data") data: RegisterInputType) {
  //   const user =  await User.create(data).save();
  //   return user;
  // }
  
  @Mutation(() => User)
  async register(@Arg("data") data: RegisterInputType) {
    const user = User.create(data);
    await user.save();
    return user;
  }
  // async register(
  //   @Arg("data")
  //   registerInput: RegisterInputType
  // ): Promise<User> {
  //   const hashedPassword = await bcrypt.hash(registerInput.password, 13);
  //   registerInput.password = hashedPassword;
  //   const user = await User.create(registerInput).save();
  //   return user;
  // }

}