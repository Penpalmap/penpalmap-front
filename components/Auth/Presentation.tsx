import { Box, Flex, Text, Image } from '@chakra-ui/react'
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
            >
                {t('presentation.devise1')}
                <br />
                {t('presentation.devise2')}
            </Text>

            <Flex
                py={12}
                w={'full'}
                gap={'20'}
                alignItems={'center'}
                flexDir={['column', 'row']}
            >
                <Box flex={1}>
                    <Image
                        src="/images/image_landing2.png"
                        alt="PenPalMap"
                        width={'100%'}
                        borderRadius={'lg'}
                    />
                </Box>
                <Box flex={1} fontWeight={'medium'} fontSize={['sm', 'lg']}>
                    <Text>
                        PenPalMap is your gateway to the global village. Connect
                        with individuals from all corners of the world and
                        immerse yourself in diverse cultures through online
                        chatting. Begin your international journey today -
                        become part of our worldwide pen pal community.
                    </Text>
                    <br></br>
                    <Text>
                        Discover PenPalMap, the online international
                        correspondence platform that breaks down language and
                        cultural barriers. Established in 2018, our mission is
                        to bring people from across the globe together through
                        message exchanges, thereby fostering intercultural
                        learning and understanding. Experience the joy of making
                        global friends without leaving the comfort of your home.
                    </Text>
                </Box>
            </Flex>
            <Flex
                py={12}
                w={'full'}
                gap={'20'}
                alignItems={'center'}
                flexDir={['column', 'row-reverse']}
            >
                <Box flex={1}>
                    <Image
                        src="/images/image_landing1.png"
                        alt="PenPalMap"
                        width={'100%'}
                        borderRadius={'lg'}
                    />
                </Box>
                <Box flex={1} fontWeight={'medium'} fontSize={'lg'}>
                    <Text>
                        Explore PenPalMap, the international correspondence
                        platform without real-time geolocation. Specify your
                        city or country, but never your precise location,
                        thereby ensuring your safety and privacy. On our
                        visually rich, interactive map, discover the diversity
                        of our global community while keeping your real position
                        private. Explore, connect, and stay safe with PenPalMap.
                    </Text>
                    <br></br>
                    <Text>
                        Starting your journey with PenPalMap is easy. Register,
                        create a profile, upload photos, and start searching for
                        pen pals around the globe. You can filter by country,
                        language, and interests to find the perfect pen pal.
                        Begin exchanging messages in the chat and make friends
                        worldwide.
                    </Text>
                </Box>
            </Flex>
        </Box>
    )
}

export default Presentation
