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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faLocationDot,
  faMessage,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useSession } from './../../hooks/useSession'
import Link from 'next/link'
import useLocation from '../../hooks/useLocation'
import { useMobileView } from '../../context/MobileViewContext'
import { useTranslation } from 'next-i18next'
import { getAgeByDate } from '../../utils/date'
import { useRoom } from '../../context/RoomsContext'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import LoggedInDate from '../Profile/loggedInDate'

type OverlayProfileMapProps = {
  closeOverlay: () => void
}

const OverlayProfileMap = ({ closeOverlay }: OverlayProfileMapProps) => {
  const [appData, setAppData] = useContext(AppContext)

  const { userTarget } = appData
  console.log('userTarget', userTarget)
  const { user } = useSession()
  const { country } = useLocation(
    userTarget?.geom?.coordinates?.[1],
    userTarget?.geom?.coordinates?.[0]
  )
  const genderFolder =
    userTarget?.gender === 'man' || userTarget?.gender === 'woman'
      ? userTarget?.gender
      : 'other'

  const { setMobileView } = useMobileView()

  const isMobile = useBreakpointValue({ base: true, md: false })

  const { t } = useTranslation('common')

  const { resetCountUnreadMessagesOfRoom } = useRoom()

  const handleClickButtonChat = () => {
    if (userTarget) {
      setAppData((prev) => ({
        ...prev,
        chatOpen: true,
        chatData: {
          roomChatId: userTarget.room?.id ?? null,
          userChat: userTarget,
        },
      }))
      if (userTarget.room) {
        resetCountUnreadMessagesOfRoom(userTarget.room.id)
      }
    }
    setMobileView('chat')
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const nextImage = () => {
    if (
      userTarget &&
      userTarget.userImages &&
      userTarget.userImages.length > 1
    ) {
      const lastIndex = userTarget.userImages.length - 1
      setCurrentImageIndex((prevIndex) =>
        prevIndex === lastIndex ? 0 : prevIndex + 1
      )
    }
  }

  const prevImage = () => {
    if (
      userTarget &&
      userTarget.userImages &&
      userTarget.userImages.length > 1
    ) {
      const lastIndex = userTarget.userImages.length - 1
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? lastIndex : prevIndex - 1
      )
    }
  }

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [userTarget])

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
      <Flex position="relative" alignItems="center" h="100%">
        {userTarget?.userImages && userTarget.userImages.length > 1 ? (
          <>
            <IconButton
              onClick={prevImage}
              aria-label="Previous"
              icon={<FontAwesomeIcon icon={faChevronLeft} />}
              colorScheme="white"
              fontSize="10px"
              position="absolute"
              left="0"
            />
            <Image
              src={userTarget?.image}
              h={'100%'}
              alt={userTarget?.name}
              borderLeftRadius={'10px'}
            />
            <Flex
              justifyContent="center"
              mt="2"
              position={'absolute'}
              bottom={'5%'}
              left="50%"
              transform="translateX(-50%)"
            >
              {userTarget?.userImages.map((_image, index) => (
                <Box
                  key={index}
                  w="6px"
                  h="6px"
                  bg={index === currentImageIndex ? 'teal' : 'gray.200'} // Mettez en surbrillance l'indicateur actif
                  borderRadius="full"
                  mx="1"
                  cursor="pointer"
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </Flex>
            <IconButton
              onClick={nextImage}
              aria-label="Next"
              icon={<FontAwesomeIcon icon={faChevronRight} />}
              colorScheme="wihte"
              fontSize="10px"
              position="absolute"
              right="0"
            />
          </>
        ) : (
          <Image
            src={
              userTarget?.userImages?.find((img) => img.position === 0)?.src ??
              `/images/avatar/${genderFolder}/${userTarget?.avatarNumber}.png`
            }
            w={'100%'}
            h={'100%'}
            alt={userTarget?.name}
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
              {userTarget?.name}
            </Text>
            <Text>
              ,{' '}
              {userTarget?.birthday &&
                getAgeByDate(userTarget.birthday as unknown as string)}
            </Text>
          </Flex>
          <Flex alignItems={'center'} justifyContent={'space-between'} mb={'3'}>
            {country && (
              <Flex alignItems={'center'} mt={'1'}>
                <FontAwesomeIcon icon={faLocationDot} color="#595959" />
                <Text fontSize={'sm'} ml={2} color={'#595959'}>
                  {country}
                </Text>
              </Flex>
            )}

            {userTarget?.isOnline && <Badge colorScheme="green">Online</Badge>}
          </Flex>
          <Flex alignItems={'center'} justifyContent={'space-between'} mb={'3'}>
            {userTarget?.updatedAt && (
              <Text fontSize={'sm'} color={'#595959'}>
                <LoggedInDate updatedAt={userTarget.updatedAt} />
              </Text>
            )}
          </Flex>
          {/* <Text display={['none', 'block']} fontSize={'sm'}>
            {userTarget?.bio}
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
              isDisabled={user?.id === userTarget?.id}
              onClick={() => {
                setMobileView('profile')
              }}
            />
          ) : (
            <Link
              href={`/home/?profileId=${userTarget?.id}`}
              as={`/home/profile/${userTarget?.id}`}
            >
              <Button
                display={['none', 'block']}
                flex={1}
                leftIcon={<FontAwesomeIcon icon={faUser} />}
                colorScheme="teal"
                variant="solid"
                fontSize={'12px'}
                isDisabled={user?.id === userTarget?.id}
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
            isDisabled={user?.id === userTarget?.id}
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
