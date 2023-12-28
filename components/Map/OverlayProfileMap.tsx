import {
    Badge,
    Box,
    Button,
    CloseButton,
    Flex,
    IconButton,
    Image,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'
import { User } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLocationDot,
    faMessage,
    faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useSession } from './../../hooks/useSession'
import Link from 'next/link'
import useLocation from '../../hooks/useLocation'
import { useMobileView } from '../../context/MobileViewContext'
import { useTranslation } from 'next-i18next'

type OverlayProfileMapProps = {
    userMap: User | null
    closeOverlay: () => void
    onOpenChat: (user: User) => void
}

const OverlayProfileMap = ({
    userMap,
    closeOverlay,
    onOpenChat,
}: OverlayProfileMapProps) => {
    const { user } = useSession()
    const { country } = useLocation(
        userMap?.geomR?.coordinates?.[1],
        userMap?.geomR?.coordinates?.[0]
    )
    const genderFolder =
    userMap?.gender === 'man' || userMap?.gender === 'woman'
            ? userMap?.gender
            : 'other'

    const { setMobileView } = useMobileView()

    const isMobile = useBreakpointValue({ base: true, md: false })

    const { t } = useTranslation('common')

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
                        userMap?.userImages.find((img) => img.position === 0)
                            ?.src ??
                        `/images/avatar/${genderFolder}/${userMap?.avatarNumber}.png`
                    }
                    w={'100%'}
                    alt={userMap?.name}
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
                            {userMap?.name}
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

                        {userMap?.isOnline && (
                            <Badge colorScheme="green">En ligne</Badge>
                        )}
                    </Flex>

                    <Text display={['none', 'block']} fontSize={'sm'}>
                        Salut je suis un exemple de Bio
                    </Text>
                </Box>
                <Flex justifyContent={'space-between'} gap={'12px'}>
                    {isMobile ? (
                        <IconButton
                            display={['block', 'none']}
                            flex={1}
                            icon={<FontAwesomeIcon icon={faUser} />}
                            colorScheme="teal"
                            variant="solid"
                            fontSize={'12px'}
                            aria-label={t('profil.SeeTheProfile')}
                            isDisabled={user?.id === userMap?.id}
                            onClick={() => {
                                setMobileView('profile')
                            }}
                        />
                    ) : (
                        <Link
                            href={`/?profileId=${userMap?.id}`}
                            as={`/profile/${userMap?.id}`}
                        >
                            <Button
                                display={['none', 'block']}
                                flex={1}
                                leftIcon={<FontAwesomeIcon icon={faUser} />}
                                colorScheme="teal"
                                variant="solid"
                                fontSize={'12px'}
                                isDisabled={user?.id === userMap?.id}
                            >
                                {t('profil.SeeTheProfile')}
                            </Button>
                        </Link>
                    )}

                    <IconButton
                        flex={'1'}
                        colorScheme="teal"
                        aria-label="Chat"
                        variant={'outline'}
                        padding={'5px'}
                        borderRadius={'4px'}
                        _hover={{ color: '#2b2b2b' }}
                        icon={<FontAwesomeIcon icon={faMessage} />}
                        onClick={() => {
                            userMap && onOpenChat(userMap)
                            setMobileView('chat')
                        }}
                        isDisabled={user?.id === userMap?.id}
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
