import { Box, Flex, Image, Text, keyframes } from '@chakra-ui/react'
import { motion } from 'framer-motion'

type MessageIsWritingProps = {
  image: string
}

const animationKeyframes = keyframes`
  0% { opacity: 0.5; }
    50% { opacity: 1; }
  100% { opacity: 0.5; }
`
const animation = `${animationKeyframes} 1.2s ease-in-out infinite`

export default function MessageIsWriting({ image }: MessageIsWritingProps) {
  return (
    <Flex alignSelf={'flex-start'} alignItems={'center'} maxW={'70%'}>
      {image && (
        <Image
          src={image}
          alt={'user'}
          width={8}
          height={8}
          borderRadius={'full'}
          marginRight={2}
        />
      )}

      <Box
        display={'flex'}
        flexDirection={'column'}
        animation={animation}
        as={motion.div}
      >
        <Box
          maxWidth={'350px'}
          mt={2}
          bg={'gray.200'}
          px={3}
          py={'6px'}
          borderRadius={'2xl'}
          ml={0}
          style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
        >
          <Text fontSize={'.9em'}>est en train d'écrire</Text>
        </Box>
      </Box>
    </Flex>
  )
}
