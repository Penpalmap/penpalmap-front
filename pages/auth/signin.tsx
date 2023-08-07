import SignIn from '../../components/Auth/SignIn'
import Head from 'next/head'

const signin = () => {
    return (
        <>
            <Head>
                <title>PenpalMap - Connexion</title>
            </Head>
            <SignIn />
        </>
    )
}

export default signin
