import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Register from '../../components/Auth/Register'
import Head from 'next/head'
import { useGoogleOneTapLogin } from '@react-oauth/google'

export default function signup() {
    return (
        <>
            <Head>
                <title>PenpalMap - Connexion</title>
            </Head>
            <Register />
        </>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    }
}
