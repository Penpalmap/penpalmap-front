import { Box, Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Router from 'next/router'

const CallToAction = () => {
  const { t } = useTranslation()
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      pb={40}
    >
      <Text fontSize="4xl" fontWeight="extrabold" textAlign="center" mb={4}>
        Let&apos;s create a profile and start meeting people
      </Text>
      <Text fontSize="xl" textAlign="center" mb={10}>
        Start the journey of Penpalmap 🌍
      </Text>
      <Button
        background={'white'}
        borderRadius={'full'}
        size="lg"
        onClick={() => {
          Router.push('/auth/signup')
        }}
        textTransform={'capitalize'}
      >
        {t('connect.sign-up')}
      </Button>
    </Box>
  )
}
export default CallToAction
