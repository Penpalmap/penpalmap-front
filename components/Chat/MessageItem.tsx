import { Box, Flex, Image, Text } from '@chakra-ui/react'

type MessageItemProps = {
    content: string
    isLastMessage: boolean
    isOwnMessage: boolean
    seenText: string
    image: string
    hasPreviousSameSender?: boolean
}

const MessageItem = ({
    content,
    isLastMessage,
    isOwnMessage,
    seenText,
    image,
    hasPreviousSameSender,
}: MessageItemProps) => {
    return (
        <Flex
            alignSelf={isOwnMessage ? 'flex-end' : 'flex-start'}
            alignItems={'center'}
            maxW={'70%'}
        >
            {image && !isOwnMessage && (
                <Image
                    src={image}
                    alt={'user'}
                    width={8}
                    height={8}
                    borderRadius={'full'}
                    marginRight={2}
                />
            )}

            <Box display={'flex'} flexDirection={'column'}>
                <Box
                    mb={0.5}
                    bg={isOwnMessage ? 'teal' : 'gray.200'}
                    px={3}
                    py={'6px'}
                    borderRadius={'2xl'}
                    borderBottomRightRadius={isOwnMessage ? 'md' : '2xl'}
                    borderBottomLeftRadius={isOwnMessage ? '2xl' : 'md'}
                    borderTopRightRadius={
                        hasPreviousSameSender && isOwnMessage ? 'md' : '2xl'
                    }
                    borderTopLeftRadius={
                        hasPreviousSameSender && !isOwnMessage ? 'md' : '2xl'
                    }
                    ml={!isOwnMessage && !image ? 10 : 0}
                >
                    <Text
                        fontSize={isOwnMessage ? '.9em' : '.9em'} // Adjust font size here
                        color={isOwnMessage ? 'white' : 'black'}
                        fontWeight={'normal'}
                    >
                        {content}
                    </Text>
                </Box>
                {isLastMessage && isOwnMessage && (
                    <Text fontSize={'.6em'} alignSelf="flex-end">
                        {seenText}
                    </Text>
                )}
            </Box>
        </Flex>
    )
}
export default MessageItem
