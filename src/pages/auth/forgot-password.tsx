import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import ForgotPassword from '../../components/Auth/ForgotPassword'
import { useTranslation } from 'next-i18next'

export default function ForgotPasswordPage() {
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{t('title.auth.forgotPassword')}</title>
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
