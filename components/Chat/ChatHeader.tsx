import {
    Avatar,
    AvatarBadge,
    Box,
    CloseButton,
    Divider,
    Flex,
    Text,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

type Props = {
    name: string
    photoUrl: string
    isOnline: boolean
}

const ChatHeader = ({ name, photoUrl, isOnline }: Props) => {
    const [appData, setAppData] = useContext(AppContext)

    const onCloseChat = () => {
        setAppData({
            ...appData,
            userChat: null,
            chatOpen: false,
        })
    }

    return (
        <>
            <Flex display={'flex'} alignItems={'center'} py={2} px={4}>
                <Avatar name={name} src={photoUrl} size={'sm'}>
                    <AvatarBadge
                        boxSize="1em"
                        bgColor={isOnline ? 'green.500' : 'gray.200'}
                        borderWidth={2}
                    />
                </Avatar>
                <Box ml={4}>
                    <Text fontWeight={'semibold'} lineHeight={'4'}>
                        {name}
                    </Text>
                    {/* <Text fontSize={'sm'}>{status}</Text> */}
                </Box>
                <CloseButton ml={'auto'} onClick={onCloseChat} />
            </Flex>
            <Divider borderColor={'gray.300'} boxShadow={'base'} />
        </>
    )
}

export default ChatHeader
