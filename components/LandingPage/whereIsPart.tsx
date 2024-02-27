import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

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
  const cities = [
    { image: '/images/lp/usa.jpg', cityName: 'USA' },
    { image: '/images/lp/canada.jpg', cityName: 'Canada' },
    { image: '/images/lp/france.jpg', cityName: 'France' },
    { image: '/images/lp/united_kingdom.jpg', cityName: 'United Kingdom' },
    { image: '/images/lp/brasil.jpg', cityName: 'Brasil' },
    { image: '/images/lp/danemark.jpg', cityName: 'Danemark' },
    { image: '/images/lp/australia.jpg', cityName: 'Australia' },
    { image: '/images/lp/thailand.jpg', cityName: 'Thailand' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollRight = () => {
    if (currentIndex < cities.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <Flex
      position="relative"
      overflow="hidden"
      mx={-4}
      py={6}
      mb={20}
      alignItems="center"
    >
      {currentIndex > 0 && (
        <Box
          position="absolute"
          top="50%"
          left="0"
          transform="translateY(-50%)"
          cursor="pointer"
          onClick={scrollLeft}
          zIndex={1}
          px={2}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="2x" color="white" />
        </Box>
      )}
      <Flex
        id="cityContainer"
        transform={`translateX(-${currentIndex * 100}%)`}
        transition="transform 0.5s ease"
        alignItems="center"
      >
        {cities.map((city, index) => (
          <CityBlock key={index} image={city.image} cityName={city.cityName} />
        ))}
      </Flex>
      {currentIndex < cities.length - 1 && (
        <Box
          position="absolute"
          top="50%"
          right="0"
          transform="translateY(-50%)"
          cursor="pointer"
          onClick={scrollRight}
          zIndex={1}
          px={2}
        >
          <FontAwesomeIcon icon={faChevronRight} size="2x" color="white" />
        </Box>
      )}
    </Flex>
  )
}

export default WhereIsPart
