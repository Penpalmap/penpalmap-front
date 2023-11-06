// Import des dépendances nécessaires
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout'
import customTheme from '../styles/customTheme'
import { SessionProvider } from 'next-auth/react'
import { AppProvider } from '../context/AppContext'
import { RoomProvider } from '../context/RoomsContext'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    // Utilisation de ChakraProvider pour envelopper tous les composants
    return (
        <ChakraProvider theme={customTheme}>
            <AppProvider>
                <SessionProvider session={session}>
                    <I18nextProvider i18n={i18n}>
                        <RoomProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </RoomProvider>
                    </I18nextProvider>
                </SessionProvider>
            </AppProvider>
        </ChakraProvider>
    )
}

export default MyApp
