import {
    Avatar,
    AvatarBadge,
    Box,
    CloseButton,
    Divider,
    Flex,
    Image,
    Text,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

type Props = {
    name: string
    photoUrl: string
    status: string
}

const ChatHeader = ({ name, photoUrl, status }: Props) => {
    const [appData, setAppData] = useContext(AppContext)

    const onCloseChat = () => {
        setAppData({
            ...appData,
            chatOpen: false,
        })
    }

    return (
        <>
            <Flex display={'flex'} alignItems={'center'} py={2} px={4}>
                <Avatar name={name} src={photoUrl} size={'sm'}>
                    <AvatarBadge
                        boxSize="1em"
                        bgColor={status === 'online' ? 'green.500' : 'red.500'}
                        borderWidth={3}
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
