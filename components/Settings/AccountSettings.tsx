import {
  Box,
  Heading,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { deleteUser } from '../../api/userApi'
import { useSession } from '../../hooks/useSession'

const AccountSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)
  //   const { t } = useTranslation()
  const { user, logout } = useSession()

  const [loading, setLoading] = useState<boolean>(false)

  const onDeleteAccount = async () => {
    if (!user) return
    setLoading(true)

    await deleteUser(user.id)

    setLoading(false)
    logout()
  }

  return (
    <Box>
      <Heading as="h2" size="md" mb={2}>
        account
      </Heading>

      <Button colorScheme="red" onClick={onOpen}>
        deleteMyAccount
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              deleteMyAccount
            </AlertDialogHeader>

            <AlertDialogBody>
              Vous voulez vraiment supprimer votre compte ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                accountCancelDeletion
              </Button>
              <Button
                colorScheme="red"
                onClick={onDeleteAccount}
                ml={3}
                isLoading={loading}
              >
                accountDelete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default AccountSettings
