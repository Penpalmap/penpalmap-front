import {
    Avatar,
    AvatarBadge,
    Box,
    Divider,
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
            <Box
                height={58}
                display={'flex'}
                alignItems={'center'}
                py={10}
                px={4}
            >
                <Avatar name={name} src={photoUrl}>
                    <AvatarBadge
                        boxSize="1em"
                        bgColor={status === 'online' ? 'green.500' : 'red.500'}
                    />
                </Avatar>
                <Box>
                    <Text fontWeight={'bold'}>{name}</Text>
                    <Text>{status}</Text>
                </Box>
            </Box>
            <Divider />
        </>
    )
}

export default ChatHeader
