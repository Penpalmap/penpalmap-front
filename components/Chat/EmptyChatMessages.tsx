import { Box, Image, Text } from '@chakra-ui/react'

type Props = {
    image: string
    name: string
}

const EmptyChatMessages = ({ image, name }: Props) => (
    <Box flex={1} display={'flex'} flexDirection={'column'} p={2} h={'full'}>
        <Box
            flex={1}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Image
                src={image}
                alt={name}
                width={150}
                height={150}
                objectFit={'cover'}
                borderRadius={'full'}
            />

            <Box my={20}>
                <Text>Engagez la discussion avec {name} ! 👋</Text>
            </Box>
        </Box>
    </Box>
)

export default EmptyChatMessages
