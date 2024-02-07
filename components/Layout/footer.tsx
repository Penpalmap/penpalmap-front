import React from 'react'
import { Box, Flex, HStack, Image, Link, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInfoCircle,
  faEnvelope,
  faFileAlt,
  faBalanceScale,
} from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer>
      <Box bg="gray.200" py="4" px="6" h={'auto'}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <VStack spacing="2" align="center" mb={{ base: '4', md: '0' }}>
            <HStack>
              <Image src="/images/logo.png" alt="pen" width={30} />
              <Text>PenpalMap</Text>
            </HStack>
          </VStack>

          <HStack
            spacing={{ base: '4', md: '8' }}
            flexWrap="wrap"
            display={'flex'}
            justifyContent={'center'}
          >
            <VStack spacing="2" align="flex-start" m={'10%'}>
              <Text fontWeight="bold">Company Info</Text>
              <Link
                href="/about"
                color="blue.600"
                fontWeight="medium"
                display="flex"
                alignItems="center"
              >
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{ marginRight: '5px' }}
                />
                {t('footer.about')}
              </Link>
              <Link
                href="/contact"
                color="blue.600"
                fontWeight="medium"
                display="flex"
                alignItems="center"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ marginRight: '5px' }}
                />
                {t('footer.contact')}
              </Link>
            </VStack>

            <VStack spacing="2" align="flex-start" m={'10%'}>
              <Text fontWeight="bold">Social Media</Text>
              <Link
                href="https://www.instagram.com/penpalmap"
                color="blue.600"
                fontWeight="medium"
                display="flex"
                alignItems="center"
              >
                Instagram
              </Link>
              <Link
                href="https://www.facebook.com/penpalmap"
                color="blue.600"
                fontWeight="medium"
                display="flex"
                alignItems="center"
              >
                Facebook
              </Link>
              <Link
                href="https://www.linkedin.com/company/penpalmap"
                color="blue.600"
                fontWeight="medium"
                display="flex"
                alignItems="center"
              >
                LinkedIn
              </Link>
            </VStack>

            <VStack spacing="2" align="flex-start" m={'10%'} flex={1}>
              <Text fontWeight="bold">Legal Links</Text>
              <Link
                href="/terms"
                color="blue.600"
                fontWeight="medium"
                display="flex"
                alignItems="center"
              >
                <FontAwesomeIcon
                  icon={faFileAlt}
                  style={{ marginRight: '5px' }}
                />
                {t('footer.terms')}
              </Link>
              <Link
                href="/legalnotice"
                color="blue.600"
                fontWeight="medium"
                display="flex"
                alignItems="center"
              >
                <FontAwesomeIcon
                  icon={faBalanceScale}
                  style={{ marginRight: '5px' }}
                />
                {t('footer.legal')}
              </Link>
            </VStack>
          </HStack>
        </Flex>
      </Box>
    </footer>
  )
}

export default Footer
