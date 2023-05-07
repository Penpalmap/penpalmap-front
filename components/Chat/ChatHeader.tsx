import { Box, Image, Text } from '@chakra-ui/react'

type Props = {
    name: string
    photoUrl: string
    status: string
}

const ChatHeader = ({ name, photoUrl, status }: Props) => {
    return (
        <Box
            height={58}
            bg={'blue.200'}
            display={'flex'}
            alignItems={'center'}
            py={10}
            px={4}
        >
            <Image
                src={photoUrl}
                alt={name}
                mr={4}
                w={14}
                borderRadius={'full'}
            />
            <Box>
                <Text fontWeight={'bold'}>{name}</Text>
                <Text>{status}</Text>
            </Box>
        </Box>
    )
}

export default ChatHeader
