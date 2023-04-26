import { User } from "next-auth";

export type RegisterUserInput = {
  email: string;
  name: string;
  password: string;
};

export type ProfileFormData = {
  photo: FileList;
  birthday: string;
  location: Array<Float32Array>;
  gender: string;
};
