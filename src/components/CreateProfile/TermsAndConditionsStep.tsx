// TermsAndConditionsStep.tsx
import React from 'react'
import { Box, Text, Link } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const TermsAndConditionsStep: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <Box>
      <Text>{t('connect.conditionsPart1')}</Text>
      <br />
      <Text>{t('connect.conditionsPart2')}</Text>
      <br />
      <Text>{t('connect.conditionsPart3')}</Text>
      <br />
      <Link
        href="/terms"
        textDecoration="underline"
        color={'gray.500'}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('connect.seeTerms')}
      </Link>
    </Box>
  )
}

export default TermsAndConditionsStep
