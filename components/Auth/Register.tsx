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
import { useSession } from '../../hooks/useSession'
import Router from 'next/router'
import { registerUser } from '../../api/authApi'

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

        Router.push('/create-profile')
    }

    const scrollLeftToRight = keyframes`0% {transform: translateX(-50%);}100% {transform: translateX(0);}`

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
                                alt="PenPalMap"
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
