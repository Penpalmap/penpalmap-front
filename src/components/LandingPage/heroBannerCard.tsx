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
import HeroBannerCardMobile from './heroBannerCardMobile'

const HeroBannerCard = ({ isMobile }) => {
  const scrollLeftToRight = keyframes`0% {transform: translateX(-50%);}100% {transform: translateX(0);}`
  const { t } = useTranslation('common')

  if (isMobile) {
    return (
      <Box>
        <HeroBannerCardMobile />
      </Box>
    )
  }
  return (
    <Box
      h={['calc(95vh - 3.5rem)', '700px']}
      borderRadius={'30px'}
      position={'relative'}
      overflow={'hidden'}
      my={[15, 35]}
      mx={[0, 35]}
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
              src="/images/LandingMapLight.webp"
              alt="MeetMapper"
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
        p={{ base: '2.5rem', md: '3.5rem', lg: '5rem' }}
        justifyContent={'space-between'}
        h={'full'}
      >
        <Box>
          <Box
            display={'contents'}
            fontSize={{ base: '2em', md: '2.5em', lg: '3.5em' }}
            fontWeight={'extrabold'}
            color={'white'}
            mb={3}
          >
            <Text as="span" textShadow={'0px 4px 6px rgba(0, 0, 0, 0.3)'}>
              {t('presentation.taglineBeforeFriends')}
            </Text>

            <Text
              as="span"
              color={'teal.300'}
              textShadow={'0px 4px 6px rgba(0, 0, 0, 0.3)'}
            >
              {t('presentation.taglineFriends')}
            </Text>
            <Text as="span" textShadow={'0px 4px 6px rgba(0, 0, 0, 0.3)'}>
              {t('presentation.taglineAfterFriends')}
            </Text>
          </Box>

          <Text
            marginTop={5}
            fontSize={['1,5em', '2em']}
            fontWeight={'bold'}
            color={'white'}
            textShadow={'0px 4px 6px rgba(0, 0, 0, 0.3)'}
          >
            {t('presentation.taglineActions')}
          </Text>

          <Box py={{ base: 6, md: 20 }} color={'white'}>
            <Link href={`/#informationsPart`} color={'white.500'}>
              <Text>
                {t('presentation.learnMore')} <ArrowForwardIcon />
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
