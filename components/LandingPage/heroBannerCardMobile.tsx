import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Text,
  Highlight,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { ReactTyped } from 'react-typed'

const HeroBannerCardMobile = () => {
  const { t } = useTranslation('common')

  const countries = [
    t('countriesISO.TH'),
    t('countriesISO.FR'),
    t('countriesISO.IN'),
    t('countriesISO.IT'),
    t('countriesISO.AU'),
    t('countriesISO.ID'),
  ]
  return (
    <Box>
      <Flex position="relative" justifyContent="center">
        <Image
          src="/images/lp/HeroBannerLandingImageMobile.png"
          alt="PenpalMap"
          width="full"
          aspectRatio="auto"
        />
        <Box
          id="contentFront"
          position="absolute"
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={'5vh'}
        >
          <div className="image-wrapper">
            {/* <Image
            src="/images/lp/HeroBannerLandingImageMobileFace.png"
            alt="PenpalMap"
            height="17vh"
            aspectRatio="auto"
          /> */}
          </div>
          <Box id="boutons" mt={'90%'}>
            <HStack>
              <Link href="/auth/signup">
                <Button
                  width="260px"
                  variant="solid"
                  borderRadius="full"
                  bgColor="white"
                  shadow="md"
                  _hover={{ bg: 'teal.400', color: 'white' }}
                  textTransform="capitalize"
                >
                  <Text>Google</Text>
                </Button>
              </Link>
            </HStack>
            <HStack mt={2}>
              <Link href="/auth/signup">
                <Button
                  variant="solid"
                  borderRadius="full"
                  width="260px"
                  bgColor="white"
                  shadow="md"
                  _hover={{ bg: 'teal.400', color: 'white' }}
                  textTransform="capitalize"
                >
                  {t('connect.sign-up')}
                </Button>
              </Link>
            </HStack>
          </Box>
        </Box>
      </Flex>
      <Text
        align="center"
        fontSize="xl"
        fontWeight={'bold'}
        ml="5"
        mr="5"
        mb="15"
      >
        <Highlight
          query={[t('presentation.taglineMeet'), t('presentation.taglineTrip')]}
          styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}
        >
          {t('presentation.taglineBeforeCountries')}
        </Highlight>{' '}
        <ReactTyped strings={countries} typeSpeed={150} loop />
        : <br />
        {t('presentation.taglineAfterCountries')}
      </Text>
    </Box>
  )
}

export default HeroBannerCardMobile
