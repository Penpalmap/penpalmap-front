import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { UserImage } from '../../types'
import ProfileImage from '../Profile/ProfileImages'
import { useTranslation } from 'next-i18next'
import { useSession } from '../../hooks/useSession'
import { updateUser } from '../../api/user/userApi'
import MapInput from '../Elements/form/mapInput'
import Link from 'next/link'

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
        <Flex justifyContent={'center'}>
          <VStack>
            <Link
              href={`/home/?profileId=${user?.id}`}
              as={`/home/profile/${user?.id}`}
            >
              <Image
                src={user?.image}
                alt={user?.name}
                borderRadius={'full'}
                boxSize={'70px'}
                objectFit={'cover'}
                border={'2px solid #edf2f7'}
              />
            </Link>
            <Text
              fontSize={'lg'}
              fontWeight={'bold'}
              textTransform={'capitalize'}
            >
              {user?.name}
            </Text>

            <Link
              href={`/home/?profileId=${user?.id}`}
              as={`/home/profile/${user?.id}`}
            >
              <Button size={'sm'} colorScheme={'teal'}>
                {t('profil.SeeTheProfile')}
              </Button>
            </Link>
          </VStack>
        </Flex>
        <Divider my={4} />
        <Text fontSize={'xl'} fontWeight={'bold'} mb={2}>
          Modifier le profil
        </Text>
        <Text fontWeight={'semibold'}>{t('profil.photos')}</Text>
        <Text mb={2} fontSize={'small'}>
          {t('profil.addPhotos')}
        </Text>
        <ProfileImage images={images} />

        <Box mb={4}>
          <FormLabel fontWeight={'semibold'}>
            {t('profil.description')}
          </FormLabel>
          <Input
            placeholder={t('profil.EnterDescription')}
            defaultValue={user?.bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Box>

        <Box flex={1} mb={4} height={['250px', 'md']}>
          <FormLabel fontWeight={'semibold'}>Change your position</FormLabel>

          <MapInput
            onCoordinatesChange={(coordinates) => {
              setCoordinates(coordinates)
            }}
            defaultPositionMarker={
              [user?.geom?.coordinates[0], user?.geom?.coordinates[1]] as [
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
    user?.geom?.coordinates,
    user?.id,
    user?.image,
    user?.name,
  ])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
      <ModalOverlay
        bg="blackAlpha.600"
        backdropFilter="auto"
        backdropBlur="10px"
      />
      <ModalContent
        h={'70vh'}
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
          sx={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'gray.500',
              borderRadius: '24px',
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
