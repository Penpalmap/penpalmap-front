import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Register from '../../components/Auth/Register'
import Head from 'next/head'

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
