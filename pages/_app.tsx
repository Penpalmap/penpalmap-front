// Import des dépendances nécessaires
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import Layout from '../components/Layout'
import customTheme from '../styles/customTheme'
import { SessionProvider } from 'next-auth/react'

const { Button } = chakraTheme.components

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    // Utilisation de ChakraProvider pour envelopper tous les composants
    return (
        <ChakraProvider theme={customTheme}>
            <Layout>
                <SessionProvider session={session}>
                    <Component {...pageProps} />
                </SessionProvider>
            </Layout>
        </ChakraProvider>
    )
}

export default MyApp
