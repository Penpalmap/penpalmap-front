import React from 'react'
import { Box, Heading, Text, Link, Flex } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Contact = () => {
  const { t } = useTranslation('common')
  const email = 'team@penpalmap.com'
  const instagramLink = 'https://www.instagram.com/penpalmap'
  const facebookLink = 'https://www.facebook.com/penpalmap'
  const linkedinLink = 'https://www.linkedin.com/company/penpalmap'

  return (
    <Box maxW="600px" mx="auto" mt="8">
      <Heading as="h1" mb="4">
        {t('contact.title')}
      </Heading>
      <Text>{t('contact.content')}</Text>
      <Text mt="4">
        {t('contact.email')}: <Link href={`mailto:${email}`}>{email}</Link>
      </Text>
      <Flex mt="4">
        <Text>{t('contact.follow_us')}: </Text>
        <Link href={instagramLink} mx="2" isExternal>
          Instagram
        </Link>
        <Link href={facebookLink} mx="2" isExternal>
          Facebook
        </Link>
        <Link href={linkedinLink} mx="2" isExternal>
          LinkedIn
        </Link>
      </Flex>
    </Box>
  )
}

export default Contact

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
