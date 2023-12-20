import {
    Alert,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { changePassword } from '../../api/userApi'
import { useState } from 'react'
import { useSession } from '../../hooks/useSession'

type FormData = {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

const SecuritySettings = () => {
    const { t } = useTranslation()

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
        console.log(data)
        if (!user?.id) return

        try {
            await changePassword(data.oldPassword, data.newPassword, user.id)

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
                        Ancien mot de passe
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
                        Nouveau mot de passe
                    </FormLabel>
                    <Input
                        id="newPassword"
                        type="password"
                        {...register('newPassword', {
                            required: 'Ce champ est requis',
                            minLength: {
                                value: 8,
                                message:
                                    'Le mot de passe doit avoir au moins 8 caractères',
                            },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.newPassword && errors.newPassword.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.confirmPassword} mt={4}>
                    <FormLabel htmlFor="confirmPassword">
                        Confirmer le mot de passe
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
                        {errors.confirmPassword &&
                            errors.confirmPassword.message}
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
                    Changer le mot de passe
                </Button>
            </form>
        </Box>
    )
}

export default SecuritySettings
