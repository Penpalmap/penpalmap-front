import { Box, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const Loading = () => {
  const { t } = useTranslation('common')
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'calc(100vh - 60px)'}
      backgroundColor={'#3EB6A020'}
    >
      <Box>
        <Image
          src="/images/AnimatedLogo.gif"
          alt="MeetMapper Logo"
          boxSize="28"
        />
        <Text fontSize="lg" textAlign="center">
          {t('form.loading')}
        </Text>
      </Box>
    </Box>
  )
}

export default Loading
