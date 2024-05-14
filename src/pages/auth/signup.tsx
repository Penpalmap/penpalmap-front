import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Register from '../../components/Auth/Register'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

export default function SignUpPage() {
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{t('title.auth.signup')}</title>
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
