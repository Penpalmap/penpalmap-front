import {
    Avatar,
    AvatarBadge,
    Box,
    Divider,
    Flex,
    Image,
    Text,
} from '@chakra-ui/react'

type Props = {
    name: string
    photoUrl: string
    status: string
}

const ChatHeader = ({ name, photoUrl, status }: Props) => {
    return (
        <>
            <Flex display={'flex'} alignItems={'center'} py={2} px={4}>
                <Avatar name={name} src={photoUrl}>
                    <AvatarBadge
                        boxSize="1em"
                        bgColor={status === 'online' ? 'green.500' : 'red.500'}
                        borderWidth={3}
                    />
                </Avatar>
                <Box ml={4}>
                    <Text fontWeight={'semibold'}>{name}</Text>
                    <Text fontSize={'sm'}>{status}</Text>
                </Box>
            </Flex>
            <Divider borderColor={'gray.300'} boxShadow={'base'} />
        </>
    )
}

export default ChatHeader
