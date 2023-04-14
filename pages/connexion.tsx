import { Box, Text } from "@chakra-ui/react";
import Login from "../components/Auth/Login";
import { useState } from "react";
import Register from "../components/Auth/Register";

const Connexion = () => {
  // Il va y avoir la map de la page de login

  const [isLogin, setIsLogin] = useState(true);

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

export default Connexion;
