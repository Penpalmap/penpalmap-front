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
          Rencontrez une multitude de personnes aux quatre coins de la planète.
          Que vous rêviez de discuter avec un surfeur australien, de partager
          une recette de tacos avec un Mexicain ou simplement de débattre du
          dernier épisode de votre série préférée avec quelqu'un de l'autre côté
          de la planète, tout est possible ! Sur PenpalMap, les frontières
          n'existent pas, seul le plaisir de découvrir de nouvelles cultures et
          de tisser des liens authentiques compte. Alors, prêt à partir à
          l'aventure depuis votre écran ?"
        </Text>
      </Box>
    </Flex>
  )
}
export default MapInfoPart
