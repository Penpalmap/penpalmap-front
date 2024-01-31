import { Box, Heading, Link } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const InformationsSettings = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <Heading as="h2" size="md" mb={2}>
        {t('settings.informations')}
      </Heading>

      <Link href="/terms" color="blue.600" fontWeight="medium">
        {t('footer.terms')}
      </Link>
      <br />
      <Link href="/legalnotice" color="blue.600" fontWeight="medium">
        {t('footer.legal')}
      </Link>
    </Box>
  )
}

export default InformationsSettings
