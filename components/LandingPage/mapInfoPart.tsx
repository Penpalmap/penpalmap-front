import { Box, Flex, Text, Image } from '@chakra-ui/react'

const MapInfoPart = () => {
  return (
    <Flex
      flexDirection={['column-reverse', 'row']}
      gap={[10, 32]}
      alignItems={'center'}
      justifyContent={'center'}
      mb={20}
    >
      <Image
        src={'/images/lp/user_map_info.png'}
        alt={'map'}
        w={['100%', '50%']}
        h={['auto', 'auto']}
      />

      <Box>
        <Text fontSize={['3xl', '5xl']} fontWeight={'bold'} mb={6}>
          Tellement de personnes à rencontrer
        </Text>
        <Text fontSize={'lg'}>
          Tellement de personnes à rencontrer Autour d’un verre . Telleonnes à
          rencontrer. Tellement de personnes à ment de pers. Tellement de
          personnes à rencontrer Tellement de personnes à rencontrer Autour d’un
          verre . Telleonnes à rencontrer. Tellement de personnes à ment de
          pers. Tellement de personnes à rencontrer
        </Text>
      </Box>
    </Flex>
  )
}
export default MapInfoPart
