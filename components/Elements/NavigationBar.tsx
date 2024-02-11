import { Flex, Text } from '@chakra-ui/react'
import { useMobileView } from '../../context/MobileViewContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMessage } from '@fortawesome/free-solid-svg-icons'
import { useRoom } from '../../context/RoomsContext'

const NavigationBar = () => {
  const { mobileView, setMobileView } = useMobileView()
  const { totalUnreadMessagesNumber } = useRoom()

  return (
    <Flex
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="white"
      justify="space-around"
      align="center"
      h={16}
      boxShadow="0px -2px 5px rgba(0, 0, 0, 0.1)"
    >
      <Flex direction={'column'} onClick={() => setMobileView('home')} gap={2}>
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
        position={'relative'}
      >
        <FontAwesomeIcon
          color={mobileView === 'conversations' ? '#3EB6A0' : '#A6A6A6'}
          icon={faMessage}
        />

        <Text fontSize="xs" fontWeight="light">
          Chat
        </Text>
        {totalUnreadMessagesNumber > 0 && (
          <Flex
            position={'absolute'}
            alignItems={'center'}
            justifyContent={'center'}
            background={'red.400'}
            borderRadius={'full'}
            w={4}
            h={4}
            top={2}
            left={4}
            color={'white'}
            fontSize={'xs'}
          >
            {totalUnreadMessagesNumber}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default NavigationBar
