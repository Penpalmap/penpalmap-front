import { useEffect, useState } from 'react'
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Image,
    // Input,
    Stack,
    Text,
    keyframes,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import Presentation from './Presentation'
import { useTranslation } from 'next-i18next'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'
import Router from 'next/router'
import { useSession } from '../../hooks/useSession'
import Input from '../Elements/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface LoginFormData {
    email: string
    password: string
}

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>()

    const { t } = useTranslation('common')

    const { login } = useSession()

    const onSubmit = async (data: LoginFormData) => {
        try {
            const responseSignin = await axios.post(
                'http://localhost:5000/api/auth/login',
                {
                    email: data.email,
                    password: data.password,
                }
            )

            login(responseSignin.data)

            Router.push('/')

            // loginSuccess(responseSignin.data)
        } catch (error) {
            // Display the error message on the form
            setError('Authentication failed')
        }
    }

    const [error, setError] = useState<string | null>(null)
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
                    // marginLeft="-50%"
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
                    boxShadow={'lg'}
                >
                    <Image
                        src="/images/logo.png"
                        alt="PenpalMap Logo"
                        boxSize="14"
                        marginBottom={2}
                    />
                    <Heading as="h1" size="lg" mb={6} textAlign={'center'}>
                        <Text>{t('connect.connection')}</Text>
                    </Heading>
                    <Box style={googleLoginStyle} marginBottom={2}>
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
                        <Stack spacing={3}>
                            <FormControl
                                isInvalid={!!errors.email}
                                isRequired
                                marginTop={2}
                            >
                                {/* <FormLabel htmlFor="email">
                                    {t('connect.mail')}
                                </FormLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    {...register('email', {
                                        required: 'Ce champ est requis',
                                    })}
                                    bg={'white'}
                                /> */}
                                <Input
                                    register={register}
                                    validationSchema={{}}
                                    name={'email'}
                                    label={'Email'}
                                />
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={!!errors.password}
                                isRequired
                                top={2}
                            >
                                <Input
                                    bg={'white'}
                                    type="password"
                                    label="Password"
                                    name="password"
                                    register={register}
                                    validationSchema={{
                                        required: 'Ce champ est requis',
                                    }}
                                />
                                {/* <FormLabel htmlFor="password">
                                    {t('connect.password')}
                                </FormLabel>
                                <Input
                                    bg={'white'}
                                    type="password"
                                    id="password"
                                    {...register('password', {
                                        required: 'Ce champ est requis',
                                    })}
                                /> */}
                                <FormErrorMessage>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>
                            <Link href="/auth/forgot-password">
                                <Text
                                    fontSize={'sm'}
                                    textAlign={'end'}
                                    color="gray.400"
                                    cursor="pointer"
                                >
                                    {t('connect.forgot-password')}
                                </Text>
                            </Link>
                            {error && (
                                <Alert status="error" my={4}>
                                    <AlertIcon />
                                    {error}
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                color={'white'}
                                variant="outline"
                                bgGradient="linear(to-r, #3EB6A0, #38B2AC)"
                                _hover={{
                                    bgGradient:
                                        'linear(to-r, #297B70, #2C9185)',
                                }}
                            >
                                {t('connect.connect')}
                            </Button>
                        </Stack>
                    </form>
                    <Box mt={4} w={'90%'}>
                        <Text
                            fontSize={'medium'}
                            fontWeight={'bold'}
                            textAlign={'center'}
                        >
                            {/* {t('connect.no-account')}{' '} */}
                            <Link href="/auth/signup">
                                <Text
                                    as="span"
                                    cursor="pointer"
                                    textAlign={'center'}
                                    textColor={'#3EB6A0'}
                                >
                                    {t('connect.create-account')}
                                </Text>
                            </Link>
                        </Text>
                    </Box>
                </Box>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    size="2x" // Taille de l'icône
                    color="white" // Couleur de l'icône
                    style={{
                        position: 'absolute',
                        bottom: '2rem', // Ajustez la distance par rapport au bas selon vos besoins
                        left: '50%',
                        transform: 'translateX(-50%)',
                        cursor: 'pointer', // Donne un aspect de lien cliquable
                    }}
                />
            </Box>
            <Presentation />
        </>
    )
}

export default SignIn
