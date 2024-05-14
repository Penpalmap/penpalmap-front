import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import ResetPassword from '../../components/Auth/ResetPassword'
import { useTranslation } from 'next-i18next'

export default function ResetPasswordPage() {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('title.auth.resetPassword')}</title>
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
