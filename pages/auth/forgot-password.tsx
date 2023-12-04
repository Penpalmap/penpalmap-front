import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import ForgotPassword from '../../components/Auth/ForgotPassword'

export default function forgotPassword() {
    return (
        <>
            <Head>
                <title>PenpalMap - Mot de passe oublié</title>
            </Head>
            <ForgotPassword />
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
