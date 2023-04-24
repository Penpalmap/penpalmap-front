import { User } from "next-auth";

export type RegisterUserInput = {
  email: string;
  name: string;
  password: string;
};
