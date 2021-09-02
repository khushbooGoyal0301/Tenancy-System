import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Query,
  UseMiddleware
} from "type-graphql";
import { LoginInputType } from "./LoginInputType";
import { User } from "./../../../entity/User";
import { compare } from "bcryptjs";
import { LoginResponse } from "./LoginResponse";
import { MyContext } from "../../../utils/MyContext";
import {createRefreshToken,
  createAccessToken } from "../../../utils/createToken";
import { isAuth } from "../../middlewares/isAuth";

@Resolver()
export class LoginResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  me(@Ctx() { payload }: MyContext) {
    return `${payload!.userId}`;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("data") loginInput: LoginInputType,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email: loginInput.email } });

    if (!user) {
      throw new Error("Could not find User");
    }

    const valid = await compare(loginInput.password, user.password);

    if (!valid) {
      throw new Error("Bad password");
    }

    //Referesh Token
    res.cookie("devId", createRefreshToken(user), {
      httpOnly: true
    });

    return {
      accessToken: createAccessToken(user)
    };
  }
}