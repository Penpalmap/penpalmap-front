import { Box, Flex, Image, Text } from '@chakra-ui/react'

type MessageItemProps = {
  content: string
  isLastMessage: boolean
  isOwnMessage: boolean
  seenText: string
  image: string
}

const MessageItem = ({
  content,
  isLastMessage,
  isOwnMessage,
  seenText,
  image,
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
          mb={1}
          bg={isOwnMessage ? 'blue.500' : 'gray.200'}
          px={3}
          py={'6px'}
          borderRadius={'2xl'}
          ml={!isOwnMessage && !image ? 10 : 0}
        >
          <Text fontSize={'.8em'} color={isOwnMessage ? 'white' : 'black'}>
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
