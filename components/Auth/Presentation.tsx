import { Box, Flex, Text, Image, Highlight, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import SectionMapChatSecurity from './SectionMapChatSecurity'
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
            <SectionMapChatSecurity />
            <SectionWhyPenpalmap />
        </Box>
    )
}

export default Presentation
