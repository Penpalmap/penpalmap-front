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
import { User, UserElement } from '../../types'
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
import LoggedInDate from '../Profile/loggedInDate'
import { getAgeByDate } from '../../utils/date'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useRoom } from '../../context/RoomsContext'

type OverlayProfileMapProps = {
    userMap: UserElement | null
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

    const { resetCountUnreadMessagesOfRoom } = useRoom()

    const handleClickButtonChat = () => {
        if (userMap) {
            onOpenChat(userMap)
            if (userMap?.room) {
                resetCountUnreadMessagesOfRoom(userMap.room.id)
            }
        }
        setMobileView('chat')
    }

    return (
        <Flex
            justifyContent={'right'}
            id="overlay-profile"
            position={'relative'}
            bg="white"
            boxShadow="md"
            w={['340px', '400px']}
            h={['200px', '205.94px']}
            borderRadius={'10px'}
        >
            <Flex>
                {userMap?.userImages && userMap.userImages.length > 0 ? (
                    <Carousel showThumbs={false}>
                        {userMap.userImages.map((img) => (
                            <div key={img.id}>
                                <Image
                                    src={img.src}
                                    alt={userMap?.name}
                                    borderLeftRadius={'10px'}
                                />
                            </div>
                        ))}
                    </Carousel>
                ) : (
                    <Image
                        src={
                            userMap?.userImages.find(
                                (img) => img.position === 0
                            )?.src ??
                            `/images/avatar/${genderFolder}/${userMap?.avatarNumber}.png`
                        }
                        w={'100%'}
                        alt={userMap?.name}
                        borderLeftRadius={'10px'}
                    />
                )}
            </Flex>
            <Flex
                flex={'1'}
                m={'12px'}
                direction={'column'}
                justifyContent={'space-between'}
            >
                <Box>
                    <Flex alignItems={'center'} fontSize={['18px']}>
                        <Text fontWeight={'bold'} textTransform={'capitalize'}>
                            {userMap?.name}
                        </Text>
                        <Text>
                            ,{' '}
                            {userMap?.birthday &&
                                getAgeByDate(userMap.birthday)}
                        </Text>
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
                    <Flex
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        mb={'3'}
                    >
                        {userMap?.updatedAt && (
                            <Text fontSize={'sm'} color={'#595959'}>
                                <LoggedInDate updatedAt={userMap.updatedAt} />
                            </Text>
                        )}
                    </Flex>
                    {/* <Text display={['none', 'block']} fontSize={'sm'}>
                            {userMap?.bio}
                        </Text> */}
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
                        // padding={'5px'}
                        borderRadius={'4px'}
                        _hover={{ color: '#2b2b2b' }}
                        icon={<FontAwesomeIcon icon={faMessage} />}
                        onClick={handleClickButtonChat}
                        isDisabled={user?.id === userMap?.id}
                    />
                </Flex>
            </Flex>

            <CloseButton
                // bg={'#3F3F3F50'}
                zIndex={2}
                color={'gray.800'}
                padding={'5px'}
                position={'absolute'}
                right={'5apx'}
                fontSize={'12px'}
                borderRadius={'4px'}
                onClick={closeOverlay}
            />
        </Flex>
    )
}

export default OverlayProfileMap
