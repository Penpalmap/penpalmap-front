import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  Link,
  keyframes,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useTranslation } from 'next-i18next'

const HeroBannerCard = () => {
  const scrollLeftToRight = keyframes`0% {transform: translateX(-50%);}100% {transform: translateX(0);}`
  const { t } = useTranslation('common')

  return (
    <Box
      h={'600px'}
      borderRadius={'30px'}
      position={'relative'}
      overflow={'hidden'}
      my={{base: '2rem', lg: 20}}
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
        p={{base: '2.5rem', md: '3.5rem', lg: '5rem'}}
        justifyContent={'space-between'}
        h={'full'}
      >
        <Box>
          <Box
            display={'contents'}
            fontSize={{base: '2em', md: '2.5em', lg: '3.5em'}}
            fontWeight={'bold'}
            color={'white'}
            mb={3}
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

          <Box
              py={{ base:6, md:20 }}
              color={'white'}
          >
            <Link
              href={`/#informationsPart`}
              color={'white.500'}
            >
              <Text
                fontWeight={'bold'}
              >
                Learn more <ArrowForwardIcon />
              </Text>
            </Link>
          </Box>

        </Box>

        <HStack spacing={'16'}>
          <Link href={`/auth/signup`}>
            <Button
              variant={'solid'}
              borderRadius="full"
              px={12}
              size={'lg'}
              _hover={{ bg: 'teal.400', color: 'white' }}
              textTransform={'capitalize'}
            >
              {t('connect.sign-up')}
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Box>
  )
}

export default HeroBannerCard
