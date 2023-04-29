import { useRouter } from 'next/router'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import Login from '../components/Auth/SignIn'
import Register from '../components/Auth/Register'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Home = () => {
    // const { user } = useAuth();
    const router = useRouter()

    const { data: session } = useSession()

    return (
        <Box>
            <Text fontSize="4xl">Bienvenue sur la page de login</Text>
            <Link href="/auth/signin">
                <Text fontSize="2xl">Se connecter</Text>
            </Link>
            {session ? (
                <Text fontSize="2xl">Vous êtes connecté</Text>
            ) : (
                <Text fontSize="2xl">Vous n'êtes pas connecté</Text>
            )}
        </Box>
    )
}

export default Home
