import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { RegisterUserInput } from "../../types";
import { registerUser } from "../../api/authApi";

type Props = {
  setIsLogin: (isLogin: boolean) => void;
};

const Register = ({ setIsLogin }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserInput>();
  const onSubmit = (data: RegisterUserInput) => {
    // request to api axios post
    console.log(data);
    registerUser(data);
  };

  return (
    <Box p={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit">Register</Button>
        </Stack>
      </form>

      <Box mt={4}>
        <Text>
          Vous avez déjà un compte ?{" "}
          <Text
            as="span"
            color="blue.500"
            cursor="pointer"
            onClick={() => setIsLogin(true)}
          >
            Connectez vous
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Register;
