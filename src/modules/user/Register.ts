import { Resolver, Query, Mutation, Arg} from "type-graphql";
import bcrypt from 'bcryptjs';
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {

    @Query(() => String, {name: "helloWorlds", description: "My First one" })
    async hello() {
        return "Hello Dummy";
    }


    @Mutation(() => User)
    async register(
        @Arg('data') {firstName, lastName, email, password}: RegisterInput,

    ): Promise<User> {
        const hashedPass = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPass
        }).save();

        return user;
    }

    
}