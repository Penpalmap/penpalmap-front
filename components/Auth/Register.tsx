import {
    Alert,
    AlertIcon,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    Heading,
    Stack,
    Text,
    Image,
    keyframes,
    Flex,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { RegisterUserInput } from '../../types'
import { useState } from 'react'
import Link from 'next/link'
import Presentation from './Presentation'
import { useTranslation } from 'next-i18next'
import { useSession } from '../../hooks/useSession'
import Router from 'next/router'
import { registerUser } from '../../api/authApi'
import Input from '../Elements/Input'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
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
                    <Box style={googleLoginStyle} marginBottom={4}>
                        <GoogleLogin
                            width={320}
                            onSuccess={async (credentialResponse) => {
                                const response = await axios.post(
                                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/google`,
                                    {
                                        token: credentialResponse.credential,
                                    }
                                )

                                login(response.data)
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
                                    label="Email"
                                    name="email"
                                    register={register}
                                    validationSchema={{
                                        required: 'Email is required',
                                    }}
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
                                    label="Name"
                                    name="name"
                                    register={register}
                                    validationSchema={{
                                        required: 'Name is required',
                                    }}
                                />
                                <FormErrorMessage>
                                    {errors.name?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={!!errors.password}
                                isRequired
                            >
                                <Box marginTop={4}>
                                    <Input
                                        name="password"
                                        label="Password"
                                        type="password"
                                        register={register}
                                        validationSchema={{
                                            required: 'Password is required',
                                        }}
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
                                color={'white'}
                                variant="outline"
                                bgGradient="linear(to-r, #3EB6A0, #38B2AC)"
                                _hover={{
                                    bgGradient:
                                        'linear(to-r, #297B70, #2C9185)',
                                }}
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
                    onClick={() => {
                        // Faites défiler la page vers le bas de 500 pixels
                        window.scrollTo({
                            top: window.scrollY + 500,
                            behavior: 'smooth', // Ajoute un effet de défilement fluide
                        })
                    }}
                />
            </Box>
            <Presentation />
        </>
    )
}

export default Register
