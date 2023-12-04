import React, { useState } from 'react'
import { set, useForm } from 'react-hook-form'
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
import { reinitializePassword } from '../../api/authApi'

const ForgotPassword = () => {
    const { register, handleSubmit } = useForm()

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const onSubmit = async (data) => {
        const response = await reinitializePassword(data.email)
        console.log(response)
        if (response.success === true) {
            setMessage(response.message)
            setError('')
        } else {
            setError(response.message)
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
                        Mot de passe oublié
                    </Heading>
                    <Text mb={6}>
                        Veuillez saisir votre adresse e-mail pour réinitialiser
                        votre mot de passe.
                    </Text>
                    <FormControl>
                        <FormLabel htmlFor="email">Adresse e-mail :</FormLabel>
                        <Input
                            bg={'white'}
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Ce champ est requis',
                            })}
                        />
                    </FormControl>

                    <Button mt={4} colorScheme="blue" type="submit">
                        Envoyer
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
