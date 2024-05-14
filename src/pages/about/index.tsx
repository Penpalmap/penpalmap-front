import React from 'react'
import { Box } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SectionMapChatSecurity from '../../components/Auth/SectionMapChatSecurity'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

const About = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('title.about.index')}</title>
      </Head>
      <Box>
        <SectionMapChatSecurity />
      </Box>
    </>
  )
}

export default About

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
