import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { resetPassword, verifyResetPasswordToken } from '../../api/authApi'

const ResetPassword = () => {
  const router = useRouter()
  const { token } = router.query

  const [error, setError] = useState<string | null>(null)
  const { handleSubmit, register, watch } = useForm()

  const onSubmit = async (data) => {
    const resetPasswordResult = await resetPassword(
      token as string,
      data.newPassword
    )
    if (resetPasswordResult.success) {
      router.push('/auth/signin')
    } else {
      setError('Une erreur est survenue, veuillez réessayer.')
    }
  }

  const verifyToken = useCallback(
    async (token) => {
      try {
        const verifyResult = await verifyResetPasswordToken(token)
        if (!verifyResult.success) {
          router.push('/')
        }
      } catch (error) {
        console.error(error)
        router.push('/')
      }
    },
    [router]
  )

  useEffect(() => {
    if (token) {
      verifyToken(token)
    }
  }, [router, token, verifyToken])

  return (
    <Flex
      h={'calc(100vh - 5rem - 5.5rem)'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Box
        background={'gray.100'}
        w={{
          base: '90%',
          md: '50%',
        }}
        padding={'2rem'}
      >
        {' '}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h1" size="lg" mb={6}>
            Réinitialisation du mot de passe
          </Heading>
          <Text mb={6}>Veuillez saisir votre nouveau mot de passe.</Text>
          <FormControl>
            <FormLabel htmlFor="newPassword">New Password</FormLabel>
            <Input
              type="password"
              id="newPassword"
              bg={'white'}
              {...register('newPassword', {
                required: 'This is required',
              })}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              bg={'white'}
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                validate: (value) =>
                  value === watch('newPassword') ||
                  'The passwords do not match',
              })}
            />
          </FormControl>

          <Button mt="4" colorScheme="blue" type="submit">
            Reset Password
          </Button>
        </form>
        {error && (
          <Alert status="error" my={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
      </Box>
    </Flex>
  )
}

export default ResetPassword
