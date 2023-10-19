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
    Image,
    keyframes,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { RegisterUserInput } from '../../types'
import { registerUser } from '../../api/authApi'
import { useRouter } from 'next/router'
import { useState } from 'react'
import GoogleLoginButton from './GoogleLoginButton'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import MapConnexion from '../Map/MapConnexion'
import Presentation from './Presentation'

const Register = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterUserInput>()

    const onSubmit = async (data: RegisterUserInput) => {
        const response = await registerUser(data)
        if (response.error) {
            setError('Une erreur est survenue, veuillez réessayer.')
        } else {
            // connect user (login)
            await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            })
            // redirect to map
            router.push('/create-profile')
        }
    }

    const scrollLeftToRight = keyframes`0% {transform: translateX(-50%);}100% {transform: translateX(0);}`

    return (
        <>
            <Box position="relative" h="Auto" w="full" overflow="hidden">
                {/* <MapConnexion /> */}
                <Box
                    w="400vh" // Double de la largeur pour contenir les deux images
                    animation={`${scrollLeftToRight} 120s linear infinite`} // Appliquez l'animation* 
                    bg="#8CBBD4" // Ajout de la couleur de fond
                >
                    <Image
                        src="/images/LandingMap_01.png"
                        alt="PenPalMap"
                        width="50%"
                        display="inline-block"
                    />
                    <Image
                        src="/images/LandingMap_01.png"
                        alt="PenPalMap"
                        width="50%"
                        display="inline-block"
                    />
                </Box>
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
                    <Heading as="h1" size="lg" mb={6}>
                        Inscrivez-vous
                    </Heading>
                    <GoogleLoginButton />
                    <Divider my={6} />
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: '90%' }}
                    >
                        <Stack spacing={4}>
                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                    })}
                                    bg={'white'}
                                />
                                <FormErrorMessage>
                                    {errors.email?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.name}>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type="text"
                                    {...register('name', {
                                        required: 'Name is required',
                                    })}
                                    bg={'white'}
                                />
                                <FormErrorMessage>
                                    {errors.name?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.password}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                    })}
                                    bg={'white'}
                                />
                                <FormErrorMessage>
                                    {errors.password?.message}
                                </FormErrorMessage>
                            </FormControl>
                            {error && (
                                <Alert status="error" my={4}>
                                    <AlertIcon />
                                    {error}
                                </Alert>
                            )}
                            <Button type="submit" colorScheme="blue">
                                S&apos;inscrire
                            </Button>
                        </Stack>
                    </form>
                    <Box mt={4}>
                        <Text fontSize={'small'}>
                            Vous avez déjà un compte ?{' '}
                            <Link href="/auth/signin">
                                <Text
                                    as="span"
                                    color="blue.500"
                                    cursor="pointer"
                                >
                                    Connectez-vous
                                </Text>
                            </Link>
                        </Text>
                    </Box>
                </Box>
            </Box>
            <Presentation />
        </>
    )
}

export default Register
