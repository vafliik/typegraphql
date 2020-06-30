import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import bcrypt from 'bcryptjs';
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationEmail } from "../utils/createConfirmationEmail";

@Resolver()
export class RegisterResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => String, { name: "helloWorlds", description: "My First one" })
    async hello() {
        return "Hello Dummy";
    }

    @UseMiddleware(logger)
    @Mutation(() => User)
    async register(
        @Arg('data') { firstName, lastName, email, password }: RegisterInput,

    ): Promise<User> {
        const hashedPass = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPass
        }).save();

        await sendEmail(email, await createConfirmationEmail(user.id));

        return user;
    }


}