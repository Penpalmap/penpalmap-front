// SectionMapChatSecurity.js
import React from 'react'
import { Box, Text, Image, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const SectionMapChatSecurity = () => {
    const { t } = useTranslation('common')

    return (
        <Flex
            py={12}
            w="full"
            gap={10}
            alignItems="flex-start"
            flexDir={{ base: 'column', md: 'row' }}
            flexWrap="wrap"
            maxW={{ base: '100%', xl: '1300px' }} // Taille maximale de 1400px pour les écrans extra larges (xl)
            mx={{ base: '2', xl: 'auto' }} // Marge horizontale sur les côtés pour les écrans extra larges
        >
            {/* Map Section */}
            <Box flex={1}>
                <Image
                    src="/images/LandingI-01.png"
                    alt="PenPalMap Map"
                    width={'100%'}
                    borderRadius={'lg'}
                />
                <Text fontWeight="bold" mt={4} textAlign="center">
                    {t('presentation.mapTitle')}
                </Text>
                <Text textAlign="center">{t('presentation.mapText')}</Text>
            </Box>

            {/* Chat Section */}
            <Box flex={1}>
                <Image
                    src="/images/LandingI-02.png"
                    alt="PenPalMap Chat"
                    width={'100%'}
                    borderRadius={'lg'}
                />
                <Text fontWeight="bold" mt={4} textAlign="center">
                    {t('presentation.chatTitle')}
                </Text>
                <Text textAlign="center">{t('presentation.chatText')}</Text>
            </Box>

            {/* Security Section */}
            <Box flex={1}>
                <Image
                    src="/images/LandingI-03.png"
                    alt="PenPalMap Security"
                    width={'100%'}
                    borderRadius={'lg'}
                />
                <Text fontWeight="bold" mt={4} textAlign="center">
                    {t('presentation.securityTitle')}
                </Text>
                <Text textAlign="center">{t('presentation.securityText')}</Text>
            </Box>
        </Flex>
    )
}

export default SectionMapChatSecurity
