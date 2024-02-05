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
import { useTranslation } from 'next-i18next'

const AccountSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)
  //   const { t } = useTranslation()
  const { user, logout } = useSession()
  const [loading, setLoading] = useState<boolean>(false)
  const { t } = useTranslation()

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
        {t('settings.account')}
      </Heading>

      <Button colorScheme="red" onClick={onOpen}>
        {t('settings.deleteMyAccount')}
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
              {t('settings.deleteMyAccount')}
            </AlertDialogHeader>

            <AlertDialogBody>{t('settings.confirmDelete')}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t('settings.cancelDeleteAccount')}
              </Button>
              <Button
                colorScheme="red"
                onClick={onDeleteAccount}
                ml={3}
                isLoading={loading}
              >
                {t('settings.deleteButton')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default AccountSettings
