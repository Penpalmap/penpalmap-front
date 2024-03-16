import { Box, Flex, Text, Image } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const MapInfoPart = () => {
  const { t } = useTranslation('common')

  return (
    <Flex
      flexDirection={['column-reverse', 'row']}
      gap={{ base: 5, lg: 20 }}
      alignItems={'center'}
      justifyContent={'center'}
      mb={20}
      mx={[0, 35]}
    >
      <Image
        src={'/images/lp/user_map_info.webp'}
        alt={'map'}
        w={['100%', '50%']}
        h={['auto', 'auto']}
      />

      <Box>
        <Text fontSize={['3xl', '5xl']} fontWeight={'bold'} mb={6}>
          {t('presentation.manyPeopleMeet')}
        </Text>
        <Text fontSize={'lg'}>{t('presentation.meetPeople')}</Text>
      </Box>
    </Flex>
  )
}
export default MapInfoPart
