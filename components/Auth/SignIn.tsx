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
    Image,
    Input,
    Stack,
    Text,
    keyframes,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import GoogleLoginButton from './GoogleLoginButton'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Presentation from './Presentation'
import { useTranslation } from 'next-i18next'

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

    const { t, i18n } = useTranslation('common')
    console.log('Current Language:', i18n.language)

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
    const scrollLeftToRight = keyframes`0% {transform: translateX(-50%);}100% {transform: translateX(0);}`
    return (
        <>
            <Box position="relative" h="Auto" w="full" overflow="hidden">
                {/* <MapConnexion /> */}
                <Box
                    w="400vh" // Double de la largeur pour contenir les deux images
                    animation={`${scrollLeftToRight} 120s linear infinite`} // Appliquez l'animation
                    bg="#8CBBD4" // Ajout de la couleur de fond
                >
                    <Image
                        src="/images/LandingMap_light.png"
                        alt="PenPalMap"
                        width="50%"
                        display="inline-block"
                    />
                    <Image
                        src="/images/LandingMap_light.png"
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
                    boxShadow={'lg'}
                >
                    <Heading as="h1" size="lg" mb={6} textAlign={'center'}>
                        <Text>{t('connect.connection')}</Text>
                    </Heading>
                    <GoogleLoginButton />

                    <Divider my={6} />
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: '90%' }}
                    >
                        <Stack spacing={3}>
                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel htmlFor="email">
                                    {t('connect.mail')}
                                </FormLabel>
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
                                    {t('connect.password')}
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
                                {t('connect.connect')}
                            </Button>
                        </Stack>
                    </form>

                    <Box mt={4} w={'90%'}>
                        <Text fontSize={'small'}>
                            {t('connect.no-account')}{' '}
                            <Link href="/auth/signup">
                                <Text
                                    as="span"
                                    color="blue.500"
                                    cursor="pointer"
                                >
                                    {t('connect.create-account')}
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

export default SignIn
