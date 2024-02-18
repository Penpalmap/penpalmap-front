import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  keyframes,
} from '@chakra-ui/react'
import Link from 'next/link'

const HeroBannerCard = () => {
  const scrollLeftToRight = keyframes`0% {transform: translateX(-50%);}100% {transform: translateX(0);}`

  return (
    <Box
      h={'600px'}
      borderRadius={'30px'}
      position={'relative'}
      overflow={'hidden'}
      my={20}
    >
      <Box
        background={'blackAlpha.500'}
        position={'absolute'}
        w={'full'}
        h={'full'}
        zIndex={1}
      ></Box>
      <Box
        height={'100%'}
        w={'100%'}
        display="flex"
        position={'absolute'}
        animation={`${scrollLeftToRight} 60s linear infinite`}
      >
        {[...Array(6)].map((_, index) => (
          <Box key={index} flex="0 0 auto">
            <Image
              src="/images/LandingMap.webp"
              alt="PenpalMap"
              height="100%"
              width="auto"
              aspectRatio={'auto'}
              display="inline-block"
            />
          </Box>
        ))}
      </Box>
      <Flex
        flexDir={'column'}
        position={'absolute'}
        zIndex={2}
        p={[10, 20]}
        w={['full', '70%']}
        justifyContent={'space-between'}
        h={'full'}
      >
        <Box>
          <Box
            display={'contents'}
            fontSize={['4xl', '6xl']}
            fontWeight={'bold'}
            color={'white'}
            mb={6}
          >
            <Text as="span">Connect with </Text>

            <Text as="span" color={'#30e3c5'}>
              friends{' '}
            </Text>
            <Text as="span">from all over the world, wherever you are.</Text>
          </Box>

          <Text fontSize={'2xl'} color={'white'}>
            Make friends, learn languages and discover new cultures whatever
            your location
          </Text>
        </Box>

        <HStack spacing={'16'}>
          <Link href={`/auth/signup`}>
            <Button
              variant={'solid'}
              borderRadius="full"
              px={12}
              size={'lg'}
              _hover={{ bg: 'teal.400', color: 'white' }}
            >
              Sign up
            </Button>
          </Link>

          <Button
            variant={'outline'}
            border={'2px solid white'}
            color={'white'}
            borderRadius="full"
            px={12}
            size={'lg'}
            _hover={{ bg: 'teal.400', color: 'white' }}
          >
            <Link href={`/#informationsPart`}>Learn more</Link>
          </Button>
        </HStack>
      </Flex>
    </Box>
  )
}

export default HeroBannerCard
