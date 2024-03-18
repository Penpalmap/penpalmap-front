import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Settings from '../../components/Settings/settings'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

export default function SettingsPage() {
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{t('title.settings.index')}</title>
      </Head>
      <Settings />
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
