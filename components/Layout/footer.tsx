import React from 'react'
import { Box, Flex, HStack, Image, Link, Text, VStack } from '@chakra-ui/react'

const Footer = () => {
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
                    <VStack spacing="2" align="center">
                        <Link
                            href="/conditions"
                            color="blue.600"
                            fontWeight="medium"
                        >
                            Conditions d'utilisation
                        </Link>
                        <Link href="/rgpd" color="blue.600" fontWeight="medium">
                            Respect du RGPD
                        </Link>
                    </VStack>
                </Flex>
            </Box>
        </footer>
    )
}

export default Footer
