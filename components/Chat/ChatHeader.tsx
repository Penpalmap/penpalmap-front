import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  Text,
  Link,
  Image,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  IconButton,
  AlertDialog,
  useDisclosure,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { useContext, useRef } from 'react'
import { AppContext } from '../../context/AppContext'
import NextLink from 'next/link'
import useLocation from '../../hooks/useLocation'
import { useMobileView } from '../../context/MobileViewContext'
import { faArrowLeft, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from '../../hooks/useSession'
import { updateUser } from '../../api/user/userApi'
import { useRoom } from '../../context/RoomsContext'

type Props = {
  name: string | undefined
  photoUrl: string
  userId: string | undefined
  isOnline: boolean | undefined
}

const ChatHeader = ({ name, photoUrl, userId, isOnline }: Props) => {
  const [appData, setAppData] = useContext(AppContext)
  const { isOpen: isOpenBlockUser, onToggle: onToggleBlockUser } =
    useDisclosure()

  const { rooms, setRooms } = useRoom()

  const { user } = useSession()

  const { mobileView, setMobileView } = useMobileView()

  const dialogRef = useRef<HTMLButtonElement>(null)

  const { city, country, flag } = useLocation(
    appData?.chatData?.userChat?.geom?.coordinates?.[1] ||
      appData?.chatData?.userChat?.geom?.coordinates?.[1],
    appData?.chatData?.userChat?.geom?.coordinates?.[0] ||
      appData?.chatData?.userChat?.geom?.coordinates?.[0]
  )

  const onCloseChat = () => {
    if (mobileView === 'chat') {
      setMobileView('conversations')
    }

    setAppData({
      ...appData,
      chatData: { roomChatId: null, userChat: null },
      chatOpen: false,
    })
  }

  const handleBlockUser = async () => {
    if (user?.id && userId) {
      // users id already in blockedUserIds

      const usersAlreadyBlocked =
        user.blockedUsers?.map((blockedUser) => blockedUser.id) || []

      await updateUser(
        { blockedUserIds: [...usersAlreadyBlocked, userId] },
        user.id
      )
      // await blockUser(user.id, userId)
      const roomsFilteredBlockedUsers = rooms.filter((room) =>
        room.members.every((member) => member.id !== userId)
      )

      setRooms(roomsFilteredBlockedUsers)

      setAppData({
        ...appData,
        chatData: { roomChatId: null, userChat: null },
        chatOpen: false,
      })
    }

    onToggleBlockUser()
  }

  return (
    <>
      <Flex display={'flex'} alignItems={'center'} py={3} px={4}>
        <Flex alignItems={'center'} justifyContent={'space-between'} flex={1}>
          <IconButton
            icon={<FontAwesomeIcon icon={faArrowLeft} size="lg" />}
            aria-label="retour"
            onClick={onCloseChat}
          />
          <Flex>
            <Link href={`/?profileId=${userId}`} as={NextLink} passHref>
              <Avatar name={name} src={photoUrl} width={10} height={10}>
                <AvatarBadge
                  boxSize="0.9em"
                  bgColor={isOnline ? 'green.500' : 'gray.200'}
                  borderWidth={2}
                />
              </Avatar>
            </Link>

            <Link href={`/?profileId=${userId}`} as={NextLink} passHref>
              <Box ml={4}>
                <Text fontSize={'lg'} fontWeight={'semibold'} lineHeight={'4'}>
                  {name}
                </Text>
                <Flex fontSize={'sm'} alignItems={'center'}>
                  {city && <Text>{city}</Text>}
                  {country && city && <Text mr={2}>,</Text>}
                  {country && <Text>{country}</Text>}
                  {flag && (
                    <Image
                      src={flag}
                      ml={2}
                      boxSize={'1.5rem'}
                      alt="flag of country"
                    />
                  )}
                </Flex>
              </Box>
            </Link>
          </Flex>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FontAwesomeIcon icon={faEllipsisV} size="lg" />}
              size={'sm'}
              backgroundColor={'transparent'}
            ></MenuButton>
            <MenuList>
              <MenuItem onClick={() => onToggleBlockUser()}>
                🛡️ Block user
              </MenuItem>
              <NextLink href={`/?profileId=${userId}`} passHref>
                <MenuItem as="a">
                  {' '}
                  <Avatar
                    name={name}
                    src={photoUrl}
                    width={6}
                    height={6}
                    mr={2}
                  >
                    <AvatarBadge borderWidth={2} />
                  </Avatar>
                  {'  '}
                  View profile
                </MenuItem>
              </NextLink>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Divider borderColor={'gray.300'} boxShadow={'base'} />
      <AlertDialog
        isOpen={isOpenBlockUser}
        leastDestructiveRef={dialogRef}
        onClose={onToggleBlockUser}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Block {name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cant undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={dialogRef} onClick={onToggleBlockUser}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleBlockUser} ml={3}>
                Block
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default ChatHeader
