import { Box, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react'

const CityBlock = ({
  image,
  cityName,
}: {
  image: string
  cityName: string
}) => {
  return (
    <Box position="relative" flexShrink={0} mr={4} mb={10}>
      <Box
        position="absolute"
        w="100%"
        h="100%"
        bg="blackAlpha.300"
        borderRadius="xl"
        zIndex={-1}
      ></Box>
      <Image
        src={image}
        alt={cityName}
        h="full"
        w={'200'} // Rempli la largeur de son parent
        borderRadius="xl"
        maxW="300px" // Limite la largeur maximale à 300px
        maxH="300px" // Limite la hauteur maximale à 300px
      />
      <Text
        position={'absolute'}
        left={'50%'}
        bottom={'50%'}
        transform={'translate(-50%, 50%)'}
        color={'white'}
        fontSize={'3xl'}
        fontWeight={'bold'}
        textAlign={'center'}
        textShadow={'0px 0px 10px black'}
      >
        {cityName}
      </Text>
    </Box>
  )
}

const WhereIsPart = () => {
  const [] = useMediaQuery('(max-width: 768px)')

  const scrollRight = () => {
    const container = document.getElementById('cityContainer')
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  const scrollLeft = () => {
    const container = document.getElementById('cityContainer')
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  return (
    <Flex display={'flex'} flexDirection="column">
      <Text fontSize={['3xl', '5xl']} fontWeight={'bold'} mb={6}>
        Penpalmap est partout dans le monde
      </Text>
      <Flex overflow="hidden" mx={-4} py={6} position="relative">
        <Box
          id="cityContainer"
          display="flex"
          mx={4}
          overflowX="hidden"
          flexDirection={'row'} // Alignement horizontal sur mobile, vertical sur desktop
        >
          <CityBlock image={'/images/lp/usa.jpg'} cityName={'USA'} />
          <CityBlock image={'/images/lp/canada.jpg'} cityName={'Canada'} />
          <CityBlock image={'/images/lp/france.jpg'} cityName={'France'} />
          <CityBlock
            image={'/images/lp/united_kingdom.jpg'}
            cityName={'United Kingdom'}
          />
          <CityBlock image={'/images/lp/brasil.jpg'} cityName={'Brasil'} />
          <CityBlock image={'/images/lp/danemark.jpg'} cityName={'Danemark'} />
          <CityBlock image={'/images/lp/india.jpg'} cityName={'India'} />
          <CityBlock
            image={'/images/lp/australia.jpg'}
            cityName={'Australia'}
          />
          <CityBlock image={'/images/lp/thailand.jpg'} cityName={'Thailand'} />
          <CityBlock image={'/images/lp/china.jpg'} cityName={'China'} />
          <CityBlock image={'/images/lp/maroc.jpg'} cityName={'Maroc'} />
          <CityBlock
            image={'/images/lp/indonesia.jpg'}
            cityName={'Indonesia'}
          />
        </Box>
        <Box
          position="absolute"
          top="50%"
          left="0"
          transform="translateY(-50%)"
          cursor="pointer"
          onClick={scrollLeft}
          zIndex={1}
        >
          {'<'}
        </Box>
        <Box
          position="absolute"
          top="50%"
          right="0"
          transform="translateY(-50%)"
          cursor="pointer"
          onClick={scrollRight}
          zIndex={1}
        >
          {'>'}
        </Box>
      </Flex>
    </Flex>
  )
}

export default WhereIsPart
