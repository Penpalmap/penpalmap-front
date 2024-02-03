import {
  Box,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { UserImage } from '../../types'
import ProfileImage from '../Profile/ProfileImages'
import { useTranslation } from 'next-i18next'
import { useSession } from '../../hooks/useSession'
import { updateBio, updateUser } from '../../api/userApi'
import MapInput from '../Elements/form/mapInput'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const MyProfile = ({ isOpen, onClose }: Props) => {
  const { user, fetchUser } = useSession()

  const [bio, setBio] = useState<string>('')

  const [images, setImages] = useState<UserImage[]>([])

  const [coordinates, setCoordinates] = useState<[number, number] | null>(null)

  const { t } = useTranslation('common')

  useEffect(() => {
    if (user?.userImages) {
      setImages(user?.userImages)
    }
  }, [user?.userImages])

  const renderProfile = useMemo(() => {
    const save = async () => {
      if (user?.id) {
        await updateUser(
          {
            latitude: coordinates?.[1],
            longitude: coordinates?.[0],
            bio,
          },
          user?.id
        )
      }

      fetchUser()
      onClose()
    }

    return (
      <>
        <Box mb={4}>
          <Text fontWeight={'semibold'} fontSize={'lg'}>
            {t('profil.photos')}
          </Text>
          <Text mb={2} fontSize={'small'}>
            {t('profil.addPhotos')}
          </Text>
          <ProfileImage images={images} />
        </Box>

        <Box mb={4}>
          <FormLabel>{t('profil.description')}</FormLabel>
          <Input
            placeholder={t('profil.EnterDescription')}
            defaultValue={user?.bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Box>

        <Box flex={1} mb={4} height={['250px', 'md']}>
          <FormLabel>Change your position</FormLabel>

          <MapInput
            onCoordinatesChange={(coordinates) => {
              setCoordinates(coordinates)
            }}
            defaultPositionMarker={
              [user?.geom.coordinates[0], user?.geom.coordinates[1]] as [
                number,
                number
              ]
            }
          />
        </Box>

        <Box flex={1} mb={4}>
          <Button width={'100%'} colorScheme="blue" onClick={save}>
            {t('form.save')}
          </Button>
        </Box>
      </>
    )
  }, [
    bio,
    coordinates,
    fetchUser,
    images,
    onClose,
    t,
    user?.bio,
    user?.geom.coordinates,
    user?.id,
  ])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.600"
        backdropFilter="auto"
        backdropBlur="10px"
      />
      <ModalContent
        w={500}
        h={'container.sm'}
        overflow={'hidden'}
        alignSelf={'center'}
        borderRadius={'2xl'}
      >
        <ModalHeader borderBottom={'1px solid #ededed'}>
          <Text>{t('menu.myProfile')}</Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody
          overflowY="scroll"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          mb={4}
        >
          {renderProfile}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MyProfile
