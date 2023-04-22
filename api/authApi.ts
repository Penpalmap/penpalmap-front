import axios from "axios";
import { RegisterUserInput } from "../types";

const registerUser = async (user: RegisterUserInput) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
      user
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const checkAuthStatus = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/success`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const logoutUser = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export { registerUser, checkAuthStatus, logoutUser };
