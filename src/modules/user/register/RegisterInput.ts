import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { isEmailAlreadyExist } from "./isEmailAlreadyExist";
import { PasswordInput } from "../../shared/sharedPasswordInput";

@InputType()
export class RegisterInput extends PasswordInput{

  @Field()
  @Length(1, 30)
  firstName: string;
  
  @Field()
  @Length(1, 30)
  lastName: string;
  
  @Field()
  @IsEmail()
  @isEmailAlreadyExist({message: "Email taken"})
  email: string;
  
}