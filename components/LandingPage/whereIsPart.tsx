import { Box, Image, Text } from '@chakra-ui/react'

const CityBlock = ({
  image,
  cityName,
}: {
  image: string
  cityName: string
}) => {
  return (
    <Box
      position="relative"
      w={['100%', '50%', '25%']}
      p={'12px 8px'}
      display={'inline-block'}
    >
      <Box
        position={'absolute'}
        w={'calc(100% - 16px)'}
        h={'calc(100% - 24px)'}
        bg={'blackAlpha.300'}
        borderRadius={'xl'}
      ></Box>
      <Image src={image} alt={cityName} w={'full'} />
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
  return (
    <Box mx={'-8px'} w={'calc(100% + 16px)'} boxSizing="border-box" mb={20}>
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
  )
}

export default WhereIsPart
