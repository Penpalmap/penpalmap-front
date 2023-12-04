import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import ResetPassword from '../../components/Auth/ResetPassword'

export default function resetPassword() {
    return (
        <>
            <Head>
                <title>PenpalMap - Réinitialisation mot de passe</title>
            </Head>
            <ResetPassword />
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
