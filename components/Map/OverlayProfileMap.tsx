import {
    Badge,
    Box,
    Button,
    CloseButton,
    Flex,
    IconButton,
    Image,
    Text,
} from '@chakra-ui/react'
import { User } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLocationDot,
    faMapPin,
    faMessage,
    faPerson,
    faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useSession } from 'next-auth/react'

type OverlayProfileMapProps = {
    user: User | null
    closeOverlay: () => void
    onOpenChat: (user: User) => void
}

const OverlayProfileMap = ({
    user,
    closeOverlay,
    onOpenChat,
}: OverlayProfileMapProps) => {
    const { data: session } = useSession()

    return (
        <Flex
            id="overlay-profile"
            position={'relative'}
            bg="white"
            boxShadow="md"
            w="400px"
            h="200px"
            borderRadius={'10px'}
        >
            <Flex flex={'1'} w="200px" h="200px">
                <Image
                    src={user?.image}
                    w={'100%'}
                    alt={user?.name}
                    borderLeftRadius={'10px'}
                />
            </Flex>
            <Flex
                flex={'1'}
                p={'12px'}
                direction={'column'}
                justifyContent={'space-between'}
            >
                <Box>
                    <Flex alignItems={'center'}>
                        <Text
                            fontSize={'18px'}
                            fontWeight={'bold'}
                            textTransform={'capitalize'}
                        >
                            {user?.name}
                        </Text>
                        <Text fontSize={'18px'}>, 21</Text>
                    </Flex>
                    <Flex
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        mb={'3'}
                    >
                        <Flex alignItems={'center'} mt={'1'}>
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                color="#595959"
                            />
                            <Text fontSize={'sm'} ml={2} color={'#595959'}>
                                France
                            </Text>
                        </Flex>
                        <Badge colorScheme="green">En ligne</Badge>
                    </Flex>

                    <Text fontSize={'sm'}>Salut je suis un exemple de Bio</Text>
                </Box>
                <Flex justifyContent={'space-between'} gap={'12px'}>
                    <Button
                        flex={'2'}
                        leftIcon={<FontAwesomeIcon icon={faUser} />}
                        colorScheme="teal"
                        variant="solid"
                        fontSize={'12px'}
                        onClick={() => user && onOpenChat(user)}
                        isDisabled={session?.user?.id === user?.id}
                    >
                        View profile
                    </Button>
                    <IconButton
                        flex={'1'}
                        colorScheme="teal"
                        aria-label="Chat"
                        variant={'outline'}
                        padding={'5px'}
                        borderRadius={'4px'}
                        _hover={{ color: '#2b2b2b' }}
                        icon={<FontAwesomeIcon icon={faMessage} />}
                        onClick={() => user && onOpenChat(user)}
                        isDisabled={session?.user?.id === user?.id}
                    />
                </Flex>
            </Flex>

            <CloseButton
                // bg={'#3F3F3F50'}
                color={'gray.800'}
                padding={'5px'}
                position={'absolute'}
                top={'5px'}
                right={'5px'}
                fontSize={'12px'}
                borderRadius={'4px'}
                onClick={closeOverlay}
            />
        </Flex>
    )
}

export default OverlayProfileMap
