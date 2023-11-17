// SectionMapChatSecurity.js
import React from 'react'
import { Box, Text, Image, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const SectionMapChatSecurity = () => {
    const { t } = useTranslation('common')

    return (
        <Flex
            py={12}
            w={'full'}
            gap={10}
            alignItems={'center'}
            flexDir={['column', 'row']}
            flexWrap="wrap" // Permet aux éléments de passer à la ligne en mode mobile
            mx="auto" // Centrer horizontalement
        >
            {/* Map Section */}
            <Box flex={['none', 1]} maxW={['100%', '56.25em']}>
                <Image
                    src="/images/image_landing1.png"
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
            <Box flex={['none', 1]} maxW={['100%', '50%']}>
                <Image
                    src="/images/image_landing2.png"
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
            <Box flex={['none', 1]} maxW={['100%', '50%']}>
                <Image
                    src="/images/image_landing2.png"
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
