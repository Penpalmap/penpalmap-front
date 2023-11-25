import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CreateProfile from '../components/CreateProfile/CreateProfile'

export default function createProfile() {
    return <CreateProfile />
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    }
}
