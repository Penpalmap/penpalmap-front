import React from 'react'
import {
    Box,
    Flex,
    HStack,
    Image,
    Link,
    Select,
    Text,
    VStack,
} from '@chakra-ui/react'
// import i18n from '../../i18n'

const Footer = () => {
    // const { i18n } = useTranslation()

    return (
        <footer>
            <Box bg="gray.200" py="4" px="6">
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
                        {/* <Select
                            placeholder={i18n.language}
                            background={'white'}
                            value={i18n.language}
                            onChange={(e) =>
                                i18n.changeLanguage(e.target.value)
                            }
                        >
                            <option value="en">English</option>
                            <option value="fr">French</option>
                        </Select> */}
                        <VStack spacing="2" align="center">
                            <Link
                                href="/terms"
                                color="blue.600"
                                fontWeight="medium"
                            >
                                Terms of Use
                            </Link>
                            <Link
                                href="/legalnotice"
                                color="blue.600"
                                fontWeight="medium"
                            >
                                legal
                            </Link>
                        </VStack>
                    </Flex>
                </Flex>
            </Box>
        </footer>
    )
}

export default Footer
