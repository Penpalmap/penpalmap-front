import { useEffect, useState } from 'react'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Stack,
  Text,
  keyframes,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'
import { useSession } from '../../hooks/useSession'
import Input from '../Elements/Input'
import RGPDNotice from '../Elements/rgpdNotice'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

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

  const { login, status } = useSession()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home')
    }
  }, [status, router])

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      const responseSignin = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          email: data.email,
          password: data.password,
        }
      )

      login(responseSignin.data)
    } catch (error) {
      setIsLoading(false)
      setError('Authentication failed... Invalid email or password')
    }
  }

  const [error, setError] = useState<string | null>(null)
  const scrollLeftToRight = keyframes`0% {transform: translateX(-50%);}100% {transform: translateX(0);}`
  const googleLoginStyle = {
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.1)',
  }
  return (
    <>
      <RGPDNotice />
      <Box position="relative" height={'100vh'} overflow="hidden">
        <Box
          position={'absolute'}
          zIndex={1}
          background={'blackAlpha.400'}
          backdropFilter={'blur(2px)'}
          w={'full'}
          h={'full'}
        ></Box>
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
                src="/images/LandingMapLight.webp"
                alt="MeetMapper"
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
          pt={1}
          bg={
            'linear-gradient(300deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) 100%)'
          }
          rounded={'lg'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          boxShadow={'lg'}
          zIndex={2}
        >
          <Link href="/">
            <Button
              position="absolute"
              top={4}
              left={4}
              variant="link"
              color={'black'}
              leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            >
              {t('settings.back')}
            </Button>
          </Link>
          <Image
            src="/images/AnimatedLogo.gif"
            alt="MeetMapper Logo"
            boxSize="28"
          />
          <Heading as="h1" size="lg" mb={6} textAlign={'center'}>
            <Text>{t('connect.connection')}</Text>
          </Heading>
          {isLoading ? (
            <Text color="black" fontSize="lg">
              {t('form.loading')}
            </Text>
          ) : (
            <>
              <Box style={googleLoginStyle} marginBottom={2}>
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
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '90%' }}>
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
                      label={t('connect.mail')}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.password} isRequired top={2}>
                    <Input
                      bg={'white'}
                      type="password"
                      label={t('connect.password')}
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
                      {errors.password?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Link href="/auth/forgot-password" tabIndex={-1}>
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
                      bgGradient: 'linear(to-r, #297B70, #2C9185)',
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
            </>
          )}
        </Box>
        {/* <FontAwesomeIcon
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
        /> */}
      </Box>
      {/* <Presentation /> */}
    </>
  )
}

export default SignIn
