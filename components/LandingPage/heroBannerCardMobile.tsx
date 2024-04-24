import { Box, Button, Flex, HStack, Image, Link, Text } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useTranslation } from 'next-i18next'
import { GoogleLogin } from '@react-oauth/google'

const HeroBannerCardMobile = () => {
  const { t } = useTranslation('common')

  return (
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
        <Box id="boutons" mt={'75%'}>
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
  )
}

export default HeroBannerCardMobile
