import React from 'react'
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
} from '@chakra-ui/react'

const ForgotPassword = () => {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        // Soumettre les données pour demander la réinitialisation du mot de passe
        console.log(data) // Remplace cette ligne par ton code de soumission des données
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
            </Box>
        </Flex>
    )
}

export default ForgotPassword
