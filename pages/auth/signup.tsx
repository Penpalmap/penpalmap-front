import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Register from '../../components/Auth/Register'
import Head from 'next/head'

export default function signup() {
    return (
        <>
            <Head>
                <title>PenpalMap - Connexion</title>
                <meta
                    name="description"
                    content="Connect with friends from all over the world, wherever you are. Make friends, learn languages and discover new cultures whatever your location"
                ></meta>
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
