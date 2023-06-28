import {
    Badge,
    Box,
    CloseButton,
    Flex,
    IconButton,
    Image,
    Text,
} from '@chakra-ui/react'
import { User } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

type OverlayProfileMapProps = {
    user: User
    closeOverlay: () => void
    onOpenChat: (user: User) => void
}

const OverlayProfileMap = ({
    user,
    closeOverlay,
    onOpenChat,
}: OverlayProfileMapProps) => {
    return (
        <Flex
            position={'relative'}
            bg="white"
            boxShadow="md"
            w="400px"
            h="200px"
            borderRadius={'10px'}
        >
            <Flex flex={'1'} w="200px" h="200px">
                <Image
                    src={user.image}
                    w={'100%'}
                    alt={user.name}
                    borderLeftRadius={'10px'}
                />
            </Flex>
            <Flex flex={'1'} p={'2px 12px'} direction={'column'}>
                <Flex alignItems={'center'}>
                    <Text fontSize={'20px'} fontWeight={'bold'}>
                        {user.name}
                    </Text>
                    <Text fontSize={'20px'}>, 21</Text>
                </Flex>
                <Text>France</Text>
                <Box background={'#BFFFDD'} w={'90px'} px={'4px'} py={'2px'}>
                    <Text
                        fontSize={'14px'}
                        textAlign={'center'}
                        textTransform={'uppercase'}
                    >
                        En ligne
                    </Text>
                </Box>

                <Text fontSize={'14px'}>Salut je suis un exemple de Bio</Text>
            </Flex>
            <IconButton
                position={'absolute'}
                top={'15px'}
                right={'15px'}
                aria-label="Chat"
                padding={'5px'}
                borderRadius={'4px'}
                _hover={{ color: '#2b2b2b' }}
                icon={<FontAwesomeIcon icon={faMessage} />}
                onClick={() => onOpenChat(user)}
            />
            <CloseButton
                bg={'#3F3F3F50'}
                color={'#DFDFDF'}
                padding={'5px'}
                position={'absolute'}
                top={'15px'}
                left={'15px'}
                fontSize={'12px'}
                borderRadius={'4px'}
                onClick={closeOverlay}
            />
        </Flex>
    )
}

export default OverlayProfileMap
