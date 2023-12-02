import { Flex, Box, Text, Link } from '@chakra-ui/react'
import { useMobileView } from '../../context/MobileViewContext'

const NavigationBar = () => {
    const { mobileView, setMobileView } = useMobileView()

    return (
        <Flex
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            bg="gray.200"
            justify="space-around"
            align="center"
            p={4}
            boxShadow="0px -2px 5px rgba(0, 0, 0, 0.1)"
        >
            <Box onClick={() => setMobileView('home')}>
                <Text fontSize="sm" fontWeight="bold">
                    Home
                </Text>
            </Box>
            <Box onClick={() => setMobileView('conversations')}>
                <Text fontSize="sm" fontWeight="bold">
                    Conversations
                </Text>
            </Box>
            {/* <Box onClick={() => setMobileView('profile')}>
                <Text fontSize="sm" fontWeight="bold">
                    Profil
                </Text>
            </Box> */}
        </Flex>
    )
}

export default NavigationBar
