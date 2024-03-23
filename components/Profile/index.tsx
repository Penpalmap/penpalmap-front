import {
  Badge,
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  useEffect,
  useState,
  useMemo,
  Suspense,
  useContext,
  useCallback,
} from 'react'
import { User } from '../../types'
import { getAgeByDate } from '../../utils/date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import useLocation from '../../hooks/useLocation'
import { useTranslation } from 'next-i18next'
import MapProfile from './Map'
import { useMobileView } from '../../context/MobileViewContext'
import { AppContext } from '../../context/AppContext'
import { LanguagesKeys } from '../../types/translations'
import { useRouter } from 'next/router'
import { getUserById } from '../../api/user/userApi'

type Props = {
  userId: string
}

type ContentType = 'image' | 'bio' | 'map' | 'languages'
type ContentArray = ContentType[]

const Profile = ({ userId }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const { country, flag, city } = useLocation(
    user?.geom?.coordinates[1],
    user?.geom?.coordinates[0]
  )

  const router = useRouter()

  const [appData, setAppData] = useContext(AppContext)
  const { isMobile, setMobileView } = useMobileView()

  const [listProfiles, setListProfiles] = useState<ContentArray>([])

  const { t } = useTranslation()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(userId)
      setUser(user)
    }

    fetchUser()
  }, [userId])

  useEffect(() => {
    if (user) {
      const profileContent: ContentArray = []

      if (user?.userImages?.[1]) {
        profileContent.push('image')
      }

      // Ajouter Bio
      if (user.bio) {
        profileContent.push('bio')
      }

      // Ajouter Languages
      if (user.userLanguages && user.userLanguages.length > 0) {
        profileContent.push('languages')
      }

      if (user.userImages && user.userImages.length <= 3) {
        profileContent.push('map')
      }
      // Ajouter Map

      // Ajouter Image3 s'il existe
      if (user?.userImages?.[2]) {
        profileContent.push('image')
      }

      // Ajouter Image4 s'il existe
      if (user?.userImages?.[3]) {
        profileContent.push('image')
      }

      if (user.userImages && user.userImages.length > 3) {
        profileContent.push('map')
      }

      setListProfiles(profileContent)
    }
  }, [user])

  const renderMap = useMemo(() => {
    if (!user || !country) return null
    return (
      <Suspense fallback={<div>{t('form.loading')}</div>}>
        <MapProfile user={user} country={country} />
      </Suspense>
    )
  }, [country, t, user])

  const renderLanguages = useMemo(() => {
    if (!user) return null

    return (
      <Flex direction={'column'} flex={1} gap={2} justifyContent={'center'}>
        <Text
          color={'gray.600'}
          fontSize={'small'}
          textTransform={'uppercase'}
          fontWeight={'semibold'}
          textAlign={'center'}
        >
          Langues
        </Text>
        <VStack>
          {user?.userLanguages?.map((language, index) => (
            <Badge
              key={index}
              variant={'solid'}
              borderRadius={'full'}
              px={2}
              colorScheme={'blue'}
            >
              <Flex>
                {' '}
                <Text>
                  {t(`languages.${language.language as LanguagesKeys}`)}
                </Text>
              </Flex>
            </Badge>
          ))}
        </VStack>
      </Flex>
    )
  }, [t, user])

  const renderImage = useCallback(
    (imageUrl: string) => (
      <Image
        w={'100%'}
        h={'100%'} // Définir la hauteur à 100% pour remplir le conteneur
        maxW={'100%'}
        objectFit="cover" // Ajouté pour maintenir les proportions de l'image tout en la remplissant
        src={imageUrl}
        alt={`${user?.name ?? 'user'} profile image`}
      />
    ),
    [user?.name]
  )

  const renderBio = useMemo(() => {
    return (
      <Flex
        direction={'column'}
        flex={1}
        gap={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text
          color={'gray.600'}
          fontSize={'small'}
          textTransform={'uppercase'}
          fontWeight={'semibold'}
          textAlign={'center'}
        >
          A propos
        </Text>
        <Text textAlign={'center'} fontWeight={'semibold'}>
          {user?.bio}
        </Text>
      </Flex>
    )
  }, [user?.bio])

  const profileContent = useMemo(() => {
    const groupedContents: JSX.Element[] = []
    let imageIndex = 1
    for (let i = 0; i < listProfiles.length; i += 2) {
      const group = listProfiles.slice(i, i + 2).map((contentType, index) => {
        switch (contentType) {
          case 'image':
            const imageUrl = user?.userImages?.[imageIndex]?.src
            imageIndex++
            return (
              <Flex flex={1} key={index}>
                {renderImage(imageUrl ?? 'default-image-url')}
              </Flex>
            )
          case 'bio':
            return (
              <Flex flex={1} key={index}>
                {renderBio}
              </Flex>
            )
          case 'map':
            return (
              <Flex flex={1} key={index} position={'relative'}>
                {renderMap}
              </Flex>
            )
          case 'languages':
            return (
              <Flex flex={1} key={index}>
                {renderLanguages}
              </Flex>
            )
          default:
            return null
        }
      })

      groupedContents.push(
        <Flex minH={'450px'} bg={'teal.100'} key={i}>
          {group}
        </Flex>
      )
    }
    return groupedContents
  }, [listProfiles, renderMap, renderLanguages, renderImage, renderBio, user])

  return (
    <Box overflow={'auto'}>
      <Flex padding={6} flexDir={['column', 'row']}>
        <Flex flexDir={'column'} alignItems={'center'} marginRight={[0, 6]}>
          {isMobile && (
            <IconButton
              alignSelf={'flex-start'}
              aria-label="retour"
              icon={<FontAwesomeIcon icon={faArrowLeft} size="lg" />}
              onClick={() => {
                router.push('/home')
                setMobileView('home')
              }}
            />
          )}
          <Image
            borderRadius={'full'}
            w={'36'}
            h={'36'}
            objectFit="cover"
            src={
              user?.image ??
              `/images/avatar/${user?.gender}/${user?.avatarNumber}.png`
            }
            alt={user?.name ?? 'user profile image'}
          ></Image>
        </Flex>
        <VStack alignItems={'flex-start'}>
          <HStack gap={2}>
            <Text fontWeight={'extrabold'} fontSize={'4xl'}>
              {user?.name},{' '}
              {user?.birthday &&
                getAgeByDate(user?.birthday as unknown as string)}
            </Text>

            <Badge
              variant={'solid'}
              borderRadius={'full'}
              px={2}
              colorScheme={user?.isOnline ? 'green' : 'gray'}
            >
              {user?.isOnline ? 'Online' : 'Offline'}
            </Badge>
          </HStack>
          {/* {!user?.isOnline && (
            <Flex>
              <Text>{user?.gender === 'man' ? '👨🏻‍💻' : '👩‍💻'}</Text>
              {user?.updatedAt && <LoggedInDate updatedAt={user.updatedAt} />}
            </Flex>
          )} */}
          <Flex gap={2}>
            <Text>{user?.gender === 'man' ? '👨' : '👩'}</Text>
            <Text>{user?.gender}</Text>
          </Flex>
          <Flex gap={2}>
            <Text>{flag && <Image src={flag} w={6} alt={flag} />}</Text>
            <Text>
              {city && city + ','}
              {'  '} {country}
            </Text>
          </Flex>
        </VStack>
        <Flex
          flex={1}
          flexDir={'column'}
          alignItems={'flex-end'}
          justifyContent={'space-between'}
          alignContent={'flex-end'}
        >
          <CloseButton
            onClick={() => {
              router.push('/home')
              setMobileView('home')
            }}
          />

          <Button
            width={['100%', 'auto']}
            colorScheme="teal"
            variant="solid"
            rightIcon={<FontAwesomeIcon icon={faPaperPlane} />}
            onClick={() => {
              setAppData({
                ...appData,
                chatOpen: true,
                chatData: { roomChatId: null, userChat: appData.userTarget },
              })
              setMobileView('chat')
            }}
          >
            Message
          </Button>
        </Flex>
      </Flex>
      {profileContent}
    </Box>
  )
}
export default Profile
