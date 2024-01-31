import React from 'react'
import { Box } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SectionMapChatSecurity from '../../components/Auth/SectionMapChatSecurity'

const About = () => {
  return (
    <Box>
      <SectionMapChatSecurity />
    </Box>
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
