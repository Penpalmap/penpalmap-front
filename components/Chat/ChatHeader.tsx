import { Box } from '@chakra-ui/react'

type Props = {
    name: string
    photoUrl: string
    status: string
}

const ChatHeader = ({ name, photoUrl, status }: Props) => {
    return (
        <Box height={58} bg={'blue.200'}>
            <Box>Header CHat</Box>
        </Box>
    )
}

export default ChatHeader
