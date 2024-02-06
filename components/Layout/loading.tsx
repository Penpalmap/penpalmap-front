import { Box, Image, Text } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'calc(100vh - 60px)'}
      backgroundColor={'#3EB6A020'}
    >
      <Box>
        <Image
          src="/images/AnimatedLogo.gif"
          alt="PenpalMap Logo"
          boxSize="28"
        />
        <Text fontSize="lg" textAlign="center">
          Loading...
        </Text>
      </Box>
    </Box>
  )
}

export default Loading
