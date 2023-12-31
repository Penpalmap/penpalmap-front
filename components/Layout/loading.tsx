import { Box, Spinner } from '@chakra-ui/react'

const Loading = () => {
    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            h="100vh"
            backgroundColor={'#8CBBD4'}
        >
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        </Box>
    )
}

export default Loading
