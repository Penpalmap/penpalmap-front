import { Box, Flex, Text, Image, Highlight, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const Presentation = () => {
    const { t } = useTranslation('common')

    return (
        <Box p={[15, 5]}>
            <Text
                py={2}
                fontSize={['xl', '3xl']}
                fontWeight="bold"
                textAlign="center"
                w={'full'}
                m={'auto'}
                fontStyle="italic"
            >
                {t('presentation.devise1')}
                <br />
                {t('presentation.devise2')}
            </Text>
            <Box
                flex={1}
                textAlign="center"
                pr={[0, 4]}
                mb={[8, 0]}
                mt={4}
                mx={['auto', 'auto', 8]}
                bg="gray.100"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
            >
                {/* <Text fontWeight="bold" mb={4}>
                    {t('presentation.funTitle')}
                </Text> */}
                <Text>{t('presentation.funText')}</Text>
            </Box>
            <Flex
                w={'full'}
                gap={'10'}
                alignItems={'center'}
                flexDir={['column', 'row-reverse']}
            ></Flex>
            {/* Three sections: Map, Chat, and Security */}
            <Flex
                py={12}
                w={'full'}
                gap={10}
                alignItems={'center'}
                flexDir={['column', 'row']}
            >
                {/* Map Section */}
                <Box flex={1}>
                    <Image
                        src="/images/image_landing2.png"
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
                <Box flex={1}>
                    <Image
                        src="/images/image_landing2.png"
                        alt="PenPalMap Security"
                        width={'100%'}
                        borderRadius={'lg'}
                    />
                    <Text fontWeight="bold" mt={4} textAlign="center">
                        {t('presentation.securityTitle')}
                    </Text>
                    <Text textAlign="center">
                        {t('presentation.securityText')}
                    </Text>
                </Box>
            </Flex>
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
                        top={'20%'}
                        right={0} // Ajuster la valeur right à 0 pour atteindre le bord droit
                        bottom={'20%'}
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
                        <Button
                            colorScheme="blue"
                            size="md"
                            width={'fit-content'}
                        >
                            {t('presentation.seeDetails')}
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default Presentation
