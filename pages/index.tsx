import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (user) {
      router.push("/map");
    }
  }, [router, user]);
  // Il va y avoir la map de la page de login
  return (
    <Box>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </Box>
  );
};

export default Home;
