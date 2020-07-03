import { Length } from "class-validator";
import { Field, InputType, ClassType } from "type-graphql";

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType({isAbstract: true})
  class PasswordInput extends BaseClass{
    @Field()
    @Length(5)
    password: string;
  }
  return PasswordInput
}