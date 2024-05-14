import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CreateProfile from '../components/CreateProfile/CreateProfile'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

export default function CreateProfilePage() {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('title.createProfile')}</title>
      </Head>
      <CreateProfile />
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
