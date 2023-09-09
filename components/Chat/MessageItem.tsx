import { Box, Text } from '@chakra-ui/react'

type MessageItemProps = {
    content: string
    isLastMessage: boolean
    isOwnMessage: boolean
    seenText: string
}

const MessageItem = ({
    content,
    isLastMessage,
    isOwnMessage,
    seenText,
}: MessageItemProps) => {
    return (
        <>
            <Box
                mb={1}
                bg={isOwnMessage ? 'blue.500' : 'gray.200'}
                px={3}
                py={'6px'}
                borderRadius={'2xl'}
                alignSelf={isOwnMessage ? 'flex-end' : 'flex-start'}
                maxW={'70%'}
            >
                <Text
                    fontSize={'.8em'}
                    color={isOwnMessage ? 'white' : 'black'}
                >
                    {content}
                </Text>
            </Box>
            {isLastMessage && isOwnMessage && (
                <Text fontSize={'.6em'} alignSelf="flex-end">
                    {seenText}
                </Text>
            )}
        </>
    )
}
export default MessageItem
