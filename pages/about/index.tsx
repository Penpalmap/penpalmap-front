// LegalNotice.js

import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import SectionMapChatSecurity from '../../components/Auth/SectionMapChatSecurity'

const LegalNotice = () => {
    const { t } = useTranslation('common')

    return (
        <Box>
            <SectionMapChatSecurity />
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
