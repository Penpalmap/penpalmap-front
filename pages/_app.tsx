// Import des dépendances nécessaires
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout'
import customTheme from '../styles/customTheme'
import { SessionProvider } from './../context/SessionContext'
import { AppProvider } from '../context/AppContext'
import { RoomProvider } from '../context/RoomsContext'
import { appWithTranslation } from 'next-i18next'
import { MobileViewProvider } from '../context/MobileViewContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Head from 'next/head'
import { GoogleTagManager } from '@next/third-parties/google'

// import '../i18n' // Assurez-vous que votre configuration i18n est chargée ici

function MyApp({ Component, pageProps: { ...pageProps } }) {
  // Utilisation de ChakraProvider pour envelopper tous les composants
  return (
    <>
      <Head>
        <title>Meetmapper</title>
      </Head>
      <ChakraProvider theme={customTheme}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
        >
          <SessionProvider>
            <AppProvider>
              <MobileViewProvider>
                {/* <SessionProvider> */}
                <RoomProvider>
                  <Layout>
                    <Component {...pageProps} />
                    <GoogleTagManager gtmId={'G-M3FER3ZYN5'} />
                  </Layout>
                </RoomProvider>
                {/* </SessionProvider> */}
              </MobileViewProvider>
            </AppProvider>
          </SessionProvider>
        </GoogleOAuthProvider>
      </ChakraProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
