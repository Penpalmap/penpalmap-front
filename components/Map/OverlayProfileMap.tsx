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
    faMessage,
    faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useSession } from 'next-auth/react'
import { getPositionDataByCoords } from '../../utils/location'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAgeByDate } from '../../utils/date'

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
    const [country, setCountry] = useState<string | null>(null)

    useEffect(() => {
        if (user) {
            const getCountry = async () => {
                if (user.latitude && user.longitude) {
                    const positionData = await getPositionDataByCoords(
                        user.latitude,
                        user.longitude
                    )

                    setCountry(positionData?.address?.country)
                } else {
                    setCountry(null)
                }
            }

            getCountry()
        }
    }, [user])

    return (
        <Flex
            id="overlay-profile"
            position={'relative'}
            bg="white"
            boxShadow="md"
            w={['320px', '400px']}
            h={['150px', '200px']}
            borderRadius={'10px'}
        >
            <Flex flex={'1'} w={['150px', '200px']} h={['150px', '200px']}>
                <Image
                    src={
                        user?.userImages.find((img) => img.position === 0)?.src
                    }
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
                    <Flex alignItems={'center'} fontSize={['18px']}>
                        <Text fontWeight={'bold'} textTransform={'capitalize'}>
                            {user?.name}
                        </Text>
                        <Text>, 21</Text>
                    </Flex>
                    <Flex
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        mb={'3'}
                    >
                        {country && (
                            <Flex alignItems={'center'} mt={'1'}>
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    color="#595959"
                                />
                                <Text fontSize={'sm'} ml={2} color={'#595959'}>
                                    {country}
                                </Text>
                            </Flex>
                        )}

                        <Badge colorScheme="green">En ligne</Badge>
                    </Flex>

                    <Text display={['none', 'block']} fontSize={'sm'}>
                        Salut je suis un exemple de Bio
                    </Text>
                </Box>
                <Flex justifyContent={'space-between'} gap={'12px'}>
                    <Link
                        href={`/?profileId=${user?.id}`}
                        as={`/profile/${user?.id}`}
                    >
                        <Button
                            display={['none', 'block']}
                            flex={'2'}
                            leftIcon={<FontAwesomeIcon icon={faUser} />}
                            colorScheme="teal"
                            variant="solid"
                            fontSize={'12px'}
                            // onClick={() => user && onOpenChat(user)}
                            isDisabled={session?.user?.id === user?.id}
                        >
                            Voir le profil
                        </Button>
                        <IconButton
                            display={['block', 'none']}
                            flex={'2'}
                            icon={<FontAwesomeIcon icon={faUser} />}
                            colorScheme="teal"
                            variant="solid"
                            fontSize={'12px'}
                            // onClick={() => user && onOpenChat(user)}
                            aria-label="Voir le profil"
                            isDisabled={session?.user?.id === user?.id}
                        />
                    </Link>

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
