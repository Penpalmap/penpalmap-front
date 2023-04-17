// Import des dépendances nécessaires
import { ChakraProvider, extendBaseTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

function MyApp({ Component, pageProps }) {
  // Utilisation de ChakraProvider pour envelopper tous les composants
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
