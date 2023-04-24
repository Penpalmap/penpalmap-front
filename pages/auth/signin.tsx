import { Box, Button, Heading } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import SignIn from "../../components/Auth/SignIn";

const signin = () => {
  return <SignIn />;
};

export default signin;
