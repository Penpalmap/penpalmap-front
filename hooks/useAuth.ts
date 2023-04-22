import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { checkAuthStatus, logoutUser } from "../api/authApi";

type UserInput = {
  email: string;
  password: string;
};

const useAuth = () => {
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

      if (response.data.message) {
        setError(response.data.message);
      } else {
        setUser(response.data.user);
        router.push("/map");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const logout = async () => {
    const response = await logoutUser();

    if (!response.success) {
      setError(response.message);
    } else {
      setUser(null);
      router.push("/");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await checkAuthStatus();
        setUser(response.user);
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
  }, []);

  return {
    user,
    isLoggingIn: user !== null,
    login,
    logout,
    error,
  };
};

export default useAuth;
