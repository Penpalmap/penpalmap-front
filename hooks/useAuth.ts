import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

type UserInput = {
  email: string;
  password: string;
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const login = async (user: UserInput) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          email: user.email,
          password: user.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("response", response);
      if (response.data.message) {
        setError(response.data.message);
      } else {
        setUser(response.data.user);
        setIsAuthenticated(true);
        router.push("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const logout = () => {
    // TODO: Logout logic
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
};

export default useAuth;
