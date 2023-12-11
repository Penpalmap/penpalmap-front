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
import { useState } from 'react'
import Link from 'next/link'
import Presentation from './Presentation'
import { useTranslation } from 'next-i18next'
import axios from 'axios'
import { useSession } from '../../hooks/useSession'

const Register = () => {
    const [error, setError] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterUserInput>()

    const { session, setStatus } = useSession()

    const { t } = useTranslation('common')

    const onSubmit = async (data: RegisterUserInput) => {
        const responseRegister = await axios.post(
            'http://localhost:5000/api/auth/register',
            {
                email: data.email,
                password: data.password,
                name: data.name,
            }
        )

        localStorage.setItem('token', responseRegister.data.token)

        setStatus('authenticated')
        // router.push('/create-profile')

        // const response = await registerUser(data)
        // if (response.error) {
        //     setError('Une erreur est survenue, veuillez réessayer.')
        // } else {
        //     // connect user (login)
        //     await signIn('credentials', {
        //         email: data.email,
        //         password: data.password,
        //         redirect: false,
        //     })
        //     // redirect to map
        //     router.push('/create-profile')
        // }
    }

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
                >
                    <Heading as="h1" size="lg" mb={6}>
                        {t('connect.sign-up')}
                    </Heading>
                    <Divider my={6} />
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: '90%' }}
                    >
                        <Stack spacing={4}>
                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel>{t('connect.mail')}</FormLabel>
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
                                <FormLabel>{t('connect.nom')}</FormLabel>
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
                                <FormLabel>{t('connect.password')}</FormLabel>
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
                                {t('connect.register')}
                            </Button>
                        </Stack>
                    </form>
                    <Box mt={4}>
                        <Text fontSize={'small'}>
                            {t('connect.already-account')}{' '}
                            <Link href="/auth/signin">
                                <Text
                                    as="span"
                                    color="blue.500"
                                    cursor="pointer"
                                >
                                    {t('connect.connection')}
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
