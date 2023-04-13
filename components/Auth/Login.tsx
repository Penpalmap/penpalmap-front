import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Box } from "@chakra-ui/react";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box>
      <h1>Page de login</h1>
      <p>Il va y avoir la map de la page de login</p>
    </Box>
  );
};

export default Login;
