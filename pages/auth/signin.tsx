import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SignIn from '../../components/Auth/SignIn'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

export default function SignInPage() {
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{t('title.auth.signin')}</title>
        <meta
          name="description"
          content="Connect with friends from all over the world, wherever you are. Make friends, learn languages and discover new cultures whatever your location"
        ></meta>
      </Head>
      <SignIn />
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
