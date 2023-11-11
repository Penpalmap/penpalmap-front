import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Settings from '../../components/Settings/settings'

export default function SettingsPage() {
    return <Settings />
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    }
}
