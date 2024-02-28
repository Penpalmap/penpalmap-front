import { Box, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

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
  const { t } = useTranslation('common')
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
        {t('presentation.isWorldwide')}
      </Text>
      <Flex overflow="hidden" mx={-4} py={6} position="relative">
        <Box
          id="cityContainer"
          display="flex"
          mx={4}
          overflowX="hidden"
          flexDirection={'row'} // Alignement horizontal sur mobile, vertical sur desktop
        >
          <CityBlock
            image={'/images/lp/usa.jpg'}
            cityName={t('countriesISO.US')}
          />
          <CityBlock
            image={'/images/lp/canada.jpg'}
            cityName={t('countriesISO.CA')}
          />
          <CityBlock
            image={'/images/lp/france.jpg'}
            cityName={t('countriesISO.FR')}
          />
          <CityBlock
            image={'/images/lp/united_kingdom.jpg'}
            cityName={t('countriesISO.GB')}
          />
          <CityBlock
            image={'/images/lp/brasil.jpg'}
            cityName={t('countriesISO.BR')}
          />
          <CityBlock
            image={'/images/lp/danemark.jpg'}
            cityName={t('countriesISO.DN')}
          />
          <CityBlock
            image={'/images/lp/india.jpg'}
            cityName={t('countriesISO.IN')}
          />
          <CityBlock
            image={'/images/lp/australia.jpg'}
            cityName={t('countriesISO.AU')}
          />
          <CityBlock
            image={'/images/lp/thailand.jpg'}
            cityName={t('countriesISO.TH')}
          />
          <CityBlock
            image={'/images/lp/china.jpg'}
            cityName={t('countriesISO.CN')}
          />
          <CityBlock
            image={'/images/lp/maroc.jpg'}
            cityName={t('countriesISO.MA')}
          />
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
