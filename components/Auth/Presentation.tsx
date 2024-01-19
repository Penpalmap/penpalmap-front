import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import SectionWhyPenpalmap from './SectionWhyPenpalmap'

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
                <Text
                    maxW={{ base: '100%', xl: '1300px' }} // Taille maximale de 1400px pour les écrans extra larges (xl)
                    mx={{ base: '2', xl: 'auto' }}
                >
                    {t('presentation.text1')}
                    <br />
                    {t('presentation.text2')}
                </Text>
            </Box>
            <Flex
                w={'full'}
                gap={'10'}
                alignItems={'center'}
                flexDir={['column', 'row-reverse']}
            ></Flex>
            <SectionWhyPenpalmap />
        </Box>
    )
}

export default Presentation
