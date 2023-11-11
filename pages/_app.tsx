// Import des dépendances nécessaires
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout'
import customTheme from '../styles/customTheme'
import { SessionProvider } from 'next-auth/react'
import { AppProvider } from '../context/AppContext'
import { RoomProvider } from '../context/RoomsContext'
// import '../i18n' // Assurez-vous que votre configuration i18n est chargée ici

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    // Utilisation de ChakraProvider pour envelopper tous les composants
    return (
        <ChakraProvider theme={customTheme}>
            <AppProvider>
                <SessionProvider session={session}>
                    <RoomProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </RoomProvider>
                </SessionProvider>
            </AppProvider>
        </ChakraProvider>
    )
}

export default MyApp
