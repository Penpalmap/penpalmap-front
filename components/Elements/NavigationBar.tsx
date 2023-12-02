import { Flex, Box, Text } from '@chakra-ui/react'
import { useMobileView } from '../../context/MobileViewContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMessage } from '@fortawesome/free-solid-svg-icons'

const NavigationBar = () => {
    const { mobileView, setMobileView } = useMobileView()

    return (
        <Flex
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            bg="white"
            justify="space-around"
            align="center"
            p={4}
            boxShadow="0px -2px 5px rgba(0, 0, 0, 0.1)"
        >
            <Flex
                direction={'column'}
                onClick={() => setMobileView('home')}
                gap={2}
            >
                <FontAwesomeIcon
                    color={mobileView === 'home' ? '#3EB6A0' : '#A6A6A6'}
                    icon={faHome}
                />
                <Text fontSize="xs" fontWeight="light">
                    Home
                </Text>
            </Flex>
            <Flex
                direction={'column'}
                onClick={() => setMobileView('conversations')}
                gap={2}
            >
                <FontAwesomeIcon
                    color={
                        mobileView === 'conversations' ? '#3EB6A0' : '#A6A6A6'
                    }
                    icon={faMessage}
                />

                <Text fontSize="xs" fontWeight="light">
                    Chat
                </Text>
            </Flex>
        </Flex>
    )
}

export default NavigationBar
