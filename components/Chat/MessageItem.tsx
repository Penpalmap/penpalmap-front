import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react'

type MessageItemProps = {
  content: string
  isLastMessage: boolean
  isOwnMessage: boolean
  seenText: string
  image: string
  hasPreviousSameSender?: boolean
  hasNextSameSender?: boolean
  timestamp: string
}

const MessageItem = ({
  content,
  isLastMessage,
  isOwnMessage,
  seenText,
  image,
  hasPreviousSameSender,
  hasNextSameSender,
  timestamp: timestamp,
}: MessageItemProps) => {
  const formatTooltipLabel = (timestamp: string) => {
    const messageDate = new Date(timestamp)
    const currentDate = new Date()

    if (
      messageDate.getDate() === currentDate.getDate() &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear()
    ) {
      return messageDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    } else {
      return messageDate.toLocaleTimeString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    }
  }

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
        <Tooltip
          label={formatTooltipLabel(timestamp)}
          placement="auto"
          openDelay={500}
        >
          <Box
            mt={
              isOwnMessage
                ? hasPreviousSameSender
                  ? 0.5 // Mettez mt à 0.5 si c'est votre propre message avec le même expéditeur précédent
                  : 2 // Mettez mt à 2 si c'est votre propre message sans le même expéditeur précédent
                : hasPreviousSameSender
                ? 0.5
                : 2
            }
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
            borderBottomStartRadius={
              hasNextSameSender && !isOwnMessage ? 'md' : '2xl'
            }
            borderBottomEndRadius={
              hasNextSameSender && isOwnMessage ? 'md' : '2xl'
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
        </Tooltip>
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
