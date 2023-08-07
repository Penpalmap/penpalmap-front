import { useState } from 'react'
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Divider,
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
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MapConnexion from '../Map/MapConnexion'

interface LoginFormData {
    email: string
    password: string
}

const SignIn = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>()

    const onSubmit = async (data: LoginFormData) => {
        try {
            // Call the signIn function from NextAuth.js
            const responseSignin = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            // If the response is successful, redirect to the profile page
            if (responseSignin?.ok) {
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

    const [error, setError] = useState<string | null>(null)

    return (
        <>
            <Box position="relative" h={'80%'} w={'full'}>
                <MapConnexion />
                <Box
                    position={'absolute'}
                    left={'50%'}
                    top={'50%'}
                    transform={'translate(-50%, -50%)'}
                    w={'400px'}
                    p={6}
                    bg="whiteAlpha.700"
                    backdropFilter="blur(6px)"
                    rounded={'lg'}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <Heading as="h1" size="lg" mb={6} textAlign={'center'}>
                        Connectez-vous
                    </Heading>
                    <GoogleLoginButton />

                    <Divider my={6} />
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: '90%' }}
                    >
                        <Stack spacing={3}>
                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel htmlFor="email">E-mail</FormLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    {...register('email', {
                                        required: 'Ce champ est requis',
                                    })}
                                    bg={'white'}
                                />
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.password}>
                                <FormLabel htmlFor="password">
                                    Mot de passe
                                </FormLabel>
                                <Input
                                    bg={'white'}
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
                            {error && (
                                <Alert status="error" my={4}>
                                    <AlertIcon />
                                    {error}
                                </Alert>
                            )}
                            <Button type="submit" colorScheme="blue">
                                Se connecter
                            </Button>
                        </Stack>
                    </form>

                    <Box mt={4} w={'90%'}>
                        <Text fontSize={'small'}>
                            Vous n&apos;avez pas de compte ?{' '}
                            <Link href="/auth/signup">
                                <Text
                                    as="span"
                                    color="blue.500"
                                    cursor="pointer"
                                >
                                    Créer un compte
                                </Text>
                            </Link>
                        </Text>
                    </Box>
                </Box>
            </Box>
            <Box p={10}>
                <Text>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Recusandae, ex esse consequuntur impedit, atque totam dolor
                    facere dolore quod laboriosam eos harum nihil dolorum optio
                    non pariatur molestias, doloremque odio.
                </Text>
                <Text>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Recusandae, ex esse consequuntur impedit, atque totam dolor
                    facere dolore quod laboriosam eos harum nihil dolorum optio
                    non pariatur molestias, doloremque odio.
                </Text>
                <Text>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Recusandae, ex esse consequuntur impedit, atque totam dolor
                    facere dolore quod laboriosam eos harum nihil dolorum optio
                    non pariatur molestias, doloremque odio. Recusandae, ex esse
                    consequuntur impedit, atque totam dolor facere dolore quod
                    laboriosam eos harum nihil dolorum optio non pariatur
                    molestias, doloremque odio. Recusandae, ex esse consequuntur
                    impedit, atque totam dolor facere dolore quod laboriosam eos
                    harum nihil dolorum optio non pariatur
                </Text>
                <Text>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Recusandae, ex esse consequuntur impedit, atque totam dolor
                    facere dolore quod laboriosam eos harum nihil dolorum optio
                    non pariatur molestias, doloremque odio. Recusandae, ex esse
                    consequuntur impedit, atque totam dolor facere dolore quod
                    laboriosam eos harum nihil dolorum optio non pariatur
                    molestias, doloremque odio.
                </Text>
                <Text>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Recusandae, ex esse consequuntur impedit, atque totam dolor
                    facere dolore quod laboriosam eos harum nihil dolorum optio
                    non pariatur molestias, doloremque odio.
                </Text>
            </Box>
        </>
    )
}

export default SignIn
