import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import axios from 'axios'

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm()

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { t } = useTranslation('common')

  const onSubmit = async (data, event) => {
    event.preventDefault() // Empêche la soumission par défaut (rechargement de la page)
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        data
      )
      setMessage(
        'Un email vous a été envoyé pour réinitialiser votre mot de passe.'
      )
      setError('')
    } catch (error) {
      if (error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError(
          'Une erreur est survenue. Veuillez essayer de nouveau plus tard.'
        )
      }
      setMessage('')
    }
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h1" size="lg" mb={6}>
            {t('connect.forgotPassword')}
          </Heading>
          <Text mb={6}>{t('connect.forgotPasswordDescription')}</Text>
          <FormControl>
            <FormLabel htmlFor="email">{t('connect.emailAdress')} :</FormLabel>
            <Input
              bg={'white'}
              type="email"
              id="email"
              {...register('email', {
                required: 'Ce champ est requis',
              })}
            />
            *
          </FormControl>

          <Button mt={4} colorScheme="blue" type="submit">
            {t('connect.send')}
          </Button>
        </form>

        {message && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        )}

        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
      </Box>
    </Flex>
  )
}

export default ForgotPassword
