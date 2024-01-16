// TermsAndConditionsStep.tsx
import React from 'react'
import { Box, Text, Link } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const TermsAndConditionsStep: React.FC = () => {
    const { t } = useTranslation('common')

    return (
        <Box textAlign={'center'} maxW={'4xl'} overflowY={'scroll'}>
            <Text>{t('connect.conditionsPart1')}</Text>
            <br />
            <Text>{t('connect.conditionsPart2')}</Text>
            <br />
            <Text>{t('connect.conditionsPart3')}</Text>
            <br />
            <Link href="/terms" textDecoration="underline" color={'gray.500'}>
                {t('connect.seeTerns')}
            </Link>
        </Box>
    )
}

export default TermsAndConditionsStep
