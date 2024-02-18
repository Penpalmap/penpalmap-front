import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const HeaderLandingPage = () => {
  const { t } = useTranslation('common')
  return (
    <Flex as="header" align="center" justify="space-between" w="100%" py={10}>
      <Link href={`/home`}>
        <Flex alignItems={'center'} padding={'0.4rem'}>
          <Image src={'/images/logo.png'} alt={'logo'} w={'8'} h={'8'} />
          <Box display={'contents'} fontSize={'x-large'} fontWeight={'bold'}>
            <Text ml={2}>Penpal</Text>
            <Text as={'span'} color={'teal.400'}>
              Map
            </Text>
          </Box>
        </Flex>
      </Link>
      <Link href={`/auth/signin`}>
        <Button
          variant={'outline'}
          colorScheme="blach"
          borderRadius="full"
          px={12}
          size={'lg'}
          _hover={{ bg: 'teal.400', color: 'white' }}
        >
          {t('connect.connect')}
        </Button>
      </Link>
    </Flex>
  )
}

export default HeaderLandingPage
