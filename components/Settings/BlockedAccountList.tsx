import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Divider,
  Flex,
  Image,
  List,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { User } from '../../types'
import { useRef } from 'react'
import { unblockUser } from '../../api/user/userApi'
import { useSession } from '../../hooks/useSession'

type Props = {
  blockedUsers: User[]
  mutate: () => void
}

const BlockedAccountList = ({ blockedUsers, mutate }: Props) => {
  const { isOpen: isOpenUnblock, onToggle: onToggleUnblockUser } =
    useDisclosure()
  const { user } = useSession()

  const dialogRef = useRef<HTMLButtonElement>(null)

  const handleUnblockUser = async (blockedUserId: string) => {
    if (user?.id) {
      await unblockUser(user.id, blockedUserId)
    }

    mutate()
    onToggleUnblockUser()
  }

  return (
    <List spacing={3} marginBottom={3}>
      {blockedUsers.length === 0 && (
        <Text textAlign={'center'}>No blocked users</Text>
      )}
      {blockedUsers.map((user) => (
        <>
          <ListItem key={user.id}>
            <Flex alignItems={'center'} gap={4} justify={'space-between'}>
              <Flex gap={4} alignItems={'center'}>
                <Image
                  src={
                    user.image ??
                    `/images/avatar/${user.gender ?? 'other'}/${
                      user?.avatarNumber
                    }.png`
                  }
                  borderRadius={'full'}
                  boxSize={10}
                  alt="avatar"
                />
                <Text fontSize={'lg'} fontWeight={'semibold'}>
                  {user.name}
                </Text>
              </Flex>

              <Button
                variant={'ghost'}
                color={'red.500'}
                onClick={onToggleUnblockUser}
              >
                Unblock
              </Button>
            </Flex>
          </ListItem>
          <AlertDialog
            isOpen={isOpenUnblock}
            leastDestructiveRef={dialogRef}
            onClose={onToggleUnblockUser}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Unblock {user.name}
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You cant undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={dialogRef} onClick={onToggleUnblockUser}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="green"
                    onClick={() => handleUnblockUser(user.id)}
                    ml={3}
                  >
                    Unblock
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
          <Divider />
        </>
      ))}
    </List>
  )
}

export default BlockedAccountList
