import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SignIn from '../../components/Auth/SignIn'
import Head from 'next/head'

export default function signin() {
    return (
        <>
            <Head>
                <title>PenpalMap - Connexion</title>
            </Head>
            <SignIn />
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
