import { Field, InputType } from "type-graphql";
import { PasswordInput } from "../../shared/sharedPasswordInput";

@InputType()
export class ChangePasswordInput extends PasswordInput {

  @Field()
  token: string;
  
}