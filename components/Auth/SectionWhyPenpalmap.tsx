// SectionImageText.js
import React from 'react'
import { Box, Text, Image, Button, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const SectionWhyPenpalmap = () => {
    const { t } = useTranslation('common')

    return (
        <Flex
            py={12}
            w={'full'}
            gap={'10'}
            alignItems={'center'}
            flexDir={['column', 'row']}
        >
            {/* Image Section */}
            <Box flex={1} position="relative">
                <Image
                    src="/images/photo1.jpeg"
                    alt="Why PenPalMap Image"
                    width={'100%'}
                    maxWidth={['100%', '70%']} // Définir une largeur maximale
                    borderRadius={'lg'}
                />
                <Box
                    position="absolute"
                    top={'30%'}
                    right={0} // Ajuster la valeur right à 0 pour atteindre le bord droit
                    bottom={'30%'}
                    bg="white"
                    p={6}
                    borderRadius="lg"
                    boxShadow="lg"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-around"
                    maxWidth={['100%', '80%']} // Définir une largeur maximale
                    mx="auto" // Centrer horizontalement
                >
                    <Text fontWeight="bold" fontSize={['xl', '3xl']} mb={4}>
                        {t('presentation.whyPenpalmapTitle')}
                    </Text>
                    <Text>{t('presentation.whyPenpalmapText')}</Text>
                    <Button colorScheme="blue" size="md" width={'fit-content'}>
                        {t('presentation.seeDetails')}
                    </Button>
                </Box>
            </Box>
        </Flex>
    )
}

export default SectionWhyPenpalmap
