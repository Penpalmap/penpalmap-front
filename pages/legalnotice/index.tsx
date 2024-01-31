// LegalNotice.js

import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const LegalNotice = () => {
  const { t } = useTranslation('common')

  return (
    <Box maxW="800px" mx="auto" py="6" px="4">
      <Heading mb="5" as="h1" size="lg">
        {t('legal.legalNoticeTitle')}
      </Heading>

      <Text mb="3">
        {t('legal.companyName')}
        <br />
        {t('legal.companyEmail')}
        <br />
        {t('legal.domainEstablished')}
      </Text>

      <Heading mb="2" as="h2" size="md">
        {t('legal.disclaimer')}
      </Heading>
      <Text mb="3">{t('legal.disclaimerText')}</Text>

      <Heading mb="2" as="h2" size="md">
        {t('legal.liabilityForLinks')}
      </Heading>
      <Text mb="3">{t('legal.liabilityForLinksText')}</Text>

      <Heading mb="2" as="h2" size="md">
        {t('legal.copyright')}
      </Heading>
      <Text mb="3">{t('legal.copyrightText')}</Text>

      <Text mb="3" fontWeight="bold">
        {t('legal.copyrightNotice')}
      </Text>

      <Text mb="3">{t('legal.additionalCopyrightText')}</Text>
    </Box>
  )
}

export default LegalNotice

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
