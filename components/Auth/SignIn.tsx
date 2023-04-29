import { useState } from 'react'
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
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import GoogleLoginButton from './GoogleLoginButton'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// type Props = {
//   setIsLogin: (isLogin: boolean) => void;
// };

interface LoginFormData {
    email: string
    password: string
}

const SignIn = () => {
    // const { login, error } = useAuth();

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>()

    const onSubmit = async (data: LoginFormData) => {
        // await login(data)
        try {
            // Call the signIn function from NextAuth.js
            const responseSignin = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            // If the response is successful, redirect to the profile page
            if (responseSignin.ok) {
                router.push('/')
            } else {
                // Display the error message on the form
                setError('Identifiants incorrects')
            }
        } catch (error) {
            // Display the error message on the form
            setError('Authentication failed')
        }
    }

    const { data: session } = useSession()
    const [error, setError] = useState<string | null>(null)

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
                            {...register('email', {
                                required: 'Ce champ est requis',
                            })}
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
                            {...register('password', {
                                required: 'Ce champ est requis',
                            })}
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
                    Vous n'avez pas de compte ?{' '}
                    <Link href="/auth/signup">
                        <Text as="span" color="blue.500" cursor="pointer">
                            Créer un compte
                        </Text>
                    </Link>
                </Text>
            </Box>
        </Box>
    )
}

export default SignIn
