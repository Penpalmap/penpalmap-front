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
    // Input,
    Stack,
    Text,
    Image,
    keyframes,
    Flex,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { RegisterUserInput } from '../../types'
import { HtmlHTMLAttributes, useRef, useState } from 'react'
import Link from 'next/link'
import Presentation from './Presentation'
import { useTranslation } from 'next-i18next'
import { useSession } from '../../hooks/useSession'
import Router from 'next/router'
import { registerUser } from '../../api/authApi'
import Input from '../Elements/Input'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const Register = () => {
    const labelRef = useRef<HTMLParagraphElement | null>(null)
    const [error, setError] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterUserInput>()

    const { login } = useSession()

    const { t } = useTranslation('common')

    const onSubmit = async (data: RegisterUserInput) => {
        const resultRegisterData = await registerUser(data)

        if (!resultRegisterData.success) {
            setError("Une erreur s'est produite")
            return
        }

        login({
            accessToken: resultRegisterData.accessToken,
            refreshToken: resultRegisterData.refreshToken,
        })

        Router.push('/create-profile')
    }

    const scrollLeftToRight = keyframes`0% {transform: translateX(-50%);}100% {transform: translateX(0);}`
    const googleLoginStyle = {
        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.1)',
    }
    return (
        <>
            <Box
                position="relative"
                height={'calc(100vh - 3.5rem)'}
                overflow="hidden"
            >
                <Box
                    id="toto"
                    height={'100%'}
                    display="flex"
                    animation={`${scrollLeftToRight} 60s linear infinite`}
                    marginLeft="-50%"
                >
                    {[...Array(6)].map((_, index) => (
                        <Box key={index} flex="0 0 auto">
                            <Image
                                src="/images/LandingMap_light.png"
                                alt="PenpalMap"
                                height="100%"
                                width="auto"
                                aspectRatio={'auto'}
                                display="inline-block"
                            />
                        </Box>
                    ))}
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
                    <Image
                        src="/images/logo.png"
                        alt="PenpalMap Logo"
                        boxSize="14"
                        marginBottom={2}
                    />
                    <Heading as="h1" size="lg" mb={6}>
                        {t('connect.sign-up')}
                    </Heading>
                    <Box style={googleLoginStyle}>
                        <GoogleLogin
                            width={320}
                            onSuccess={async (credentialResponse) => {
                                const response = await axios.post(
                                    'http://localhost:5000/api/auth/login/google',
                                    {
                                        token: credentialResponse.credential,
                                    }
                                )

                                login(response.data)
                                Router.push('/')
                            }}
                            onError={() => {
                                console.log('Login Failed')
                            }}
                        />
                    </Box>
                    <Flex
                        alignItems="center"
                        mt={6}
                        mb={6}
                        w="90%"
                        justify="space-between"
                    >
                        <Box flex="1" h="1px" bg="gray.400"></Box>
                        <Text mx={2} color="gray.900" fontWeight="bold">
                            OR
                        </Text>
                        <Box flex="1" h="1px" bg="gray.400"></Box>
                    </Flex>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: '90%' }}
                    >
                        <Stack spacing={4}>
                            <FormControl
                                isInvalid={!!errors.email}
                                isRequired
                                marginTop={4}
                            >
                                <Input
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                    })}
                                    bg={'white'}
                                    placeholderText={t('connect.mail')}
                                />
                                <FormErrorMessage>
                                    {errors.email?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={!!errors.name}
                                isRequired
                                top={2}
                            >
                                <Input
                                    type="text"
                                    {...register('name', {
                                        required: 'Name is required',
                                    })}
                                    bg={'white'}
                                    placeholderText={t('connect.nom')}
                                />
                                <FormErrorMessage>
                                    {errors.name?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={!!errors.password}
                                isRequired
                            >
                                <Box position={'relative'} marginTop={4}>
                                    <Input
                                        type="password"
                                        {...register('password', {
                                            required: 'Password is required',
                                        })}
                                        bg={'white'}
                                        placeholderText={t('connect.password')}
                                    />
                                </Box>

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
                            <Button
                                type="submit"
                                backgroundColor={'#3EB6A0'}
                                color={'white'}
                            >
                                {t('connect.register')}
                            </Button>
                        </Stack>
                    </form>
                    <Box mt={4}>
                        <Text fontSize={'small'} textColor={'#3EB6A0'}>
                            {t('connect.already-account')}{' '}
                            <Link href="/auth/signin">
                                <Text
                                    as="span"
                                    color="#3EB6A0"
                                    cursor="pointer"
                                    fontWeight="bold"
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
