// Footer.js
import React from 'react'
import { Box, Flex, HStack, Image, Link, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const Footer = () => {
    const { t } = useTranslation()

    return (
        <footer>
            <Box bg="gray.200" py="4" px="6" h={'20'}>
                <Flex justifyContent="space-between" alignItems="center">
                    <VStack spacing="2" align="center">
                        <HStack>
                            <Image
                                src="/images/logo.png"
                                alt="pen"
                                width={30}
                            />
                            <Text>PenpalMap</Text>
                        </HStack>
                    </VStack>
                    <Flex alignItems={'center'} gap={'10'}>
                        <VStack spacing="2" align="center">
                            <Link
                                href="/terms"
                                color="blue.600"
                                fontWeight="medium"
                            >
                                {t('footer.terms')}
                            </Link>
                            <Link
                                href="/legalnotice"
                                color="blue.600"
                                fontWeight="medium"
                            >
                                {t('footer.legal')}
                            </Link>
                        </VStack>
                    </Flex>
                </Flex>
            </Box>
        </footer>
    )
}

export default Footer
