import { Box, Flex, Image, Text } from '@chakra-ui/react'

const CityBlock = ({
  image,
  cityName,
}: {
  image: string
  cityName: string
}) => {
  return (
    <Box position="relative" flexShrink={0} mr={4}>
      <Box
        position="absolute"
        w="100%"
        h="100%"
        bg="blackAlpha.300"
        borderRadius="xl"
        zIndex={-1}
      ></Box>
      <Image src={image} alt={cityName} w="full" borderRadius="xl" />
      <Text
        position={'absolute'}
        left={'50%'}
        bottom={'50%'}
        transform={'translate(-50%, 50%)'}
        color={'white'}
        fontSize={'3xl'}
        fontWeight={'bold'}
        textAlign={'center'}
      >
        {cityName}
      </Text>
    </Box>
  )
}

const WhereIsPart = () => {
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
    <Flex overflow="hidden" mx={-4} py={6} position="relative">
      <Box id="cityContainer" display="flex" mx={4} overflowX="auto">
        <CityBlock image={'/images/lp/usa.jpg'} cityName={'USA'} />
        <CityBlock image={'/images/lp/canada.jpg'} cityName={'Canada'} />
        <CityBlock image={'/images/lp/france.jpg'} cityName={'France'} />
        <CityBlock
          image={'/images/lp/united_kingdom.jpg'}
          cityName={'United Kingdom'}
        />
        <CityBlock image={'/images/lp/brasil.jpg'} cityName={'Brasil'} />
        <CityBlock image={'/images/lp/danemark.jpg'} cityName={'Danemark'} />
        <CityBlock image={'/images/lp/australia.jpg'} cityName={'Australia'} />
        <CityBlock image={'/images/lp/thailand.jpg'} cityName={'Thailand'} />
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
  )
}

export default WhereIsPart
