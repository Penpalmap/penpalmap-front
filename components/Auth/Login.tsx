import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import GoogleLoginButton from "./GoogleLoginButton";

interface LoginFormData {
  email: string;
  password: string;
}

type Props = {
  setIsLogin: (isLogin: boolean) => void;
};

const Login = ({ setIsLogin }: Props) => {
  const { login, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="lg" mb={6}>
        Connexion
      </Heading>
      <GoogleLoginButton />
      {error && (
        <Alert status="error" my={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              type="email"
              id="email"
              {...register("email", { required: "Ce champ est requis" })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Mot de passe</FormLabel>
            <Input
              type="password"
              id="password"
              {...register("password", { required: "Ce champ est requis" })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={4}>
            Se connecter
          </Button>
        </Stack>
      </form>

      <Box mt={4}>
        <Text>
          Vous n'avez pas de compte ?{" "}
          <Text
            as="span"
            color="blue.500"
            cursor="pointer"
            onClick={() => setIsLogin(false)}
          >
            Inscrivez-vous
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
