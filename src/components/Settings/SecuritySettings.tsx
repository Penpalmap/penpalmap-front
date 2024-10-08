import {
  Alert,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Modal,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { changePassword } from '../../api/user/userApi'
import { useState } from 'react'
import { useSession } from '../../hooks/useSession'
import BlockedAccountList from './BlockedAccountList'

type FormData = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const SecuritySettings = () => {
  const { t } = useTranslation()

  const { isOpen: isOpenBlockUser, onToggle: onToggleBlockUser } =
    useDisclosure()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const [error, setError] = useState('')

  const [message, setMessage] = useState('')

  const { user } = useSession()

  const onSubmit = async (data: FormData) => {
    if (!user?.id) return

    try {
      await changePassword(
        { oldPassword: data.oldPassword, newPassword: data.newPassword },
        user.id
      )

      setMessage(t('form.messagePasswordChange'))
      setError('')
    } catch (error) {
      setError(t('form.messageError'))
      setMessage('')
    }
  }

  const newPassword = watch('newPassword')

  return (
    <Box p={4}>
      <Heading as="h1" size="md" mb={2}>
        {t('settings.security')}
      </Heading>

      <Heading as="h2" size="sm" mb={2}>
        {t('settings.changePassword')}
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.oldPassword}>
          <FormLabel htmlFor="oldPassword">
            {t('settings.lastPassword')}
          </FormLabel>
          <Input
            id="oldPassword"
            type="password"
            {...register('oldPassword', {
              required: 'Ce champ est requis',
            })}
          />
          <FormErrorMessage>
            {errors.oldPassword && errors.oldPassword.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.newPassword} mt={4}>
          <FormLabel htmlFor="newPassword">
            {t('settings.newPassword')}
          </FormLabel>
          <Input
            id="newPassword"
            type="password"
            {...register('newPassword', {
              required: 'Ce champ est requis',
              minLength: {
                value: 8,
                message: 'Le mot de passe doit avoir au moins 8 caractères',
              },
            })}
          />
          <FormErrorMessage>
            {errors.newPassword && errors.newPassword.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword} mt={4}>
          <FormLabel htmlFor="confirmPassword">
            {t('settings.confirmNewPassword')}
          </FormLabel>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Ce champ est requis',
              validate: (value) =>
                value === newPassword ||
                'Les mots de passe ne correspondent pas',
            })}
          />
          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
          </FormErrorMessage>
        </FormControl>

        {error && (
          <Alert status="error" mt={4}>
            {error}
          </Alert>
        )}
        {message && (
          <Alert status="success" mt={4}>
            {message}
          </Alert>
        )}

        <Button mt={4} colorScheme="teal" type="submit">
          {t('settings.changePasswordButton')}
        </Button>
      </form>

      <Heading as="h2" size="sm" mt={8} mb={2}>
        Comptes bloqués
      </Heading>

      <Button
        colorScheme="teal"
        variant={'link'}
        size="sm"
        onClick={onToggleBlockUser}
      >
        Voir la liste des comptes bloqués
      </Button>

      <Modal isOpen={isOpenBlockUser} onClose={onToggleBlockUser}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comptes bloqués</ModalHeader>
          <Text color="gray.500" fontSize="smaller" px={4} mb={4}>
            By unblocking a user, you will regain access to all messages sent
            during the period of blocking. If you need any assistance, feel free
            to reach out to the PenPalMap team at team@penpalmap.com.
          </Text>
          <ModalCloseButton />
          <ModalBody>
            <BlockedAccountList />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default SecuritySettings
