import {
    Badge,
    Box,
    Button,
    Flex,
    HStack,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react'
import { useEffect, useRef, useState, useMemo } from 'react'
import { User } from '../../types'
import { getProfile } from '../../api/profileApi'
import { getAgeByDate } from '../../utils/date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Feature, Map as OLMap, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat, transformExtent } from 'ol/proj'
import XYZ from 'ol/source/XYZ'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point } from 'ol/geom'
import userStyle from '../../styles/openlayer/UserStyle'
import useLocation from '../../hooks/useLocation'
import { useTranslation } from 'next-i18next'

type Props = {
    profileId: string
}

type ContentType = 'image' | 'bio' | 'map' | 'languages'
type ContentArray = ContentType[]

const Profile = ({ profileId }: Props) => {
    const mapRefContainer = useRef<HTMLDivElement>(null)
    const mapRef = useRef<OLMap | null>(null)

    const [user, setUser] = useState<User | null>(null)
    const { country, flag, city } = useLocation(
        user?.geom.coordinates[1],
        user?.geom.coordinates[0]
    )

    const [listProfiles, setListProfiles] = useState<ContentArray>([])

    const { t } = useTranslation()

    useEffect(() => {
        if (!user || !mapRefContainer.current) return undefined

        const map = new OLMap({
            target: mapRefContainer.current,
            layers: [
                new TileLayer({
                    preload: Infinity,
                    zIndex: 0,

                    source: new XYZ({
                        url: 'https://api.mapbox.com/styles/v1/gabnoire/cjpzpqvr03a5h2sqidpht5qhm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2Fibm9pcmUiLCJhIjoiY2p0ZmhtYTVvMDVqcDQzb2NiYXY1YW4xMyJ9.9AquqYCdPTiPiDNmh7dMhQ',
                        crossOrigin: 'anonymous',
                    }),
                }),
            ],

            view: new View({
                center: fromLonLat(user.geom.coordinates),
                zoom: 7,
                extent: transformExtent(
                    [-999.453125, -58.813742, 999.453125, 70.004962],
                    'EPSG:4326',
                    'EPSG:3857'
                ),
            }),
            interactions: [],
        })

        mapRef.current = map

        return () => {
            map.setTarget(undefined)
        }
    }, [user])

    useEffect(() => {
        if (!mapRef.current || !user) return undefined

        const userSource = new VectorSource()

        const userLayer = new VectorLayer({
            source: userSource,
            style: userStyle,
        })

        mapRef.current.addLayer(userLayer)

        const coordinates = user.geom
            ? fromLonLat(user.geom.coordinates)
            : [0, 0]

        const userFeature = new Feature({
            geometry: new Point(coordinates),
            element: {
                ...user,
                strokeColor: '#FFFFFF',
            },
        })

        userSource.addFeatures([userFeature])

        return () => {
            mapRef.current?.removeLayer(userLayer)
        }
    }, [user])

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getProfile(profileId)
            setUser(user)
        }

        fetchUser()
    }, [profileId])

    useEffect(() => {
        if (user) {
            const profileContent: ContentArray = []

            // Ajouter Image2 s'il existe
            if (user.userImages && user.userImages[1]) {
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
            if (user.userImages && user.userImages[2]) {
                profileContent.push('image')
            }

            // Ajouter Image4 s'il existe
            if (user.userImages && user.userImages[3]) {
                profileContent.push('image')
            }

            if (user.userImages && user.userImages.length > 3) {
                profileContent.push('map')
            }

            setListProfiles(profileContent)
        }
    }, [user])

    const renderMap = useMemo(() => {
        if (!user) return null

        return (
            <>
                <Box
                    ref={mapRefContainer}
                    h={['400px', '450px']}
                    w={'full'}
                    className="map"
                    borderRadius={'xl'}
                ></Box>
                <Flex
                    alignItems={'center'}
                    position={'absolute'}
                    bottom={'5'}
                    left={'5'}
                    zIndex={1}
                >
                    <FontAwesomeIcon icon={faMapPin} color="#494949" />
                    <Text
                        fontWeight={'semibold'}
                        letterSpacing={'wider'}
                        color={'gray.600'}
                        ml={'2'}
                    >
                        Around
                    </Text>
                    <Text fontWeight={'bold'} ml={1}>
                        {country}
                    </Text>
                </Flex>
            </>
        )
    }, [country, user])

    const renderLanguages = useMemo(() => {
        if (!user) return null

        return (
            <Flex
                direction={'column'}
                flex={1}
                gap={2}
                justifyContent={'center'}
            >
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
                    {user.userLanguages.map((language) => (
                        <Badge
                            key={language.id}
                            variant={'solid'}
                            borderRadius={'full'}
                            px={2}
                            colorScheme={'blue'}
                        >
                            <Flex>
                                {' '}
                                <Text>
                                    {t(`languages.${language.language}`)}
                                </Text>
                            </Flex>
                        </Badge>
                    ))}
                </VStack>
            </Flex>
        )
    }, [t, user])

    const renderImage = (imageUrl) => {
        return (
            <Image
                w={'100%'}
                h={'100%'} // Définir la hauteur à 100% pour remplir le conteneur
                maxW={'100%'}
                objectFit="cover" // Ajouté pour maintenir les proportions de l'image tout en la remplissant
                src={imageUrl}
            />
        )
    }

    const renderBio = useMemo(() => {
        return (
            <Flex direction={'column'} w={'80%'} gap={2}>
                <Text
                    color={'gray.600'}
                    fontSize={'small'}
                    textTransform={'uppercase'}
                    fontWeight={'semibold'}
                >
                    A propos
                </Text>
                <Text fontWeight={'semibold'}>
                    Coucou tout le monde, moi c’est Louise et je fais beaucoup
                    de sport je suis drole et j’aime les chiens et les chat Mais
                    j’aime également les éléphants 🐘
                </Text>
            </Flex>
        )
    }, [])

    const profileContent = useMemo(() => {
        const groupedContents: JSX.Element[] = []
        let imageIndex = 1
        for (let i = 0; i < listProfiles.length; i += 2) {
            const group = listProfiles
                .slice(i, i + 2)
                .map((contentType, index) => {
                    switch (contentType) {
                        case 'image':
                            const imageUrl =
                                user?.userImages[imageIndex]?.src ||
                                'default-image-url'
                            imageIndex++
                            return (
                                <Flex flex={1} key={index}>
                                    {renderImage(imageUrl)}
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
                                <Flex
                                    flex={1}
                                    key={index}
                                    position={'relative'}
                                >
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
                <Flex maxH={'450px'} bg={'teal.100'} key={i}>
                    {group}
                </Flex>
            )
        }
        return groupedContents
    }, [listProfiles, renderMap, renderLanguages, renderImage, renderBio, user])

    return (
        <Box overflow={'auto'}>
            <Flex padding={6}>
                <Box marginRight={10}>
                    <Image
                        borderRadius={'full'}
                        w={'36'} // Largeur de l'image
                        h={'36'} // Hauteur de l'image
                        objectFit="cover" // Assure que l'image remplit le cadre tout en conservant ses proportions
                        src={
                            user?.image ||
                            `/images/avatar/${user?.gender}/${user?.avatarNumber}.png`
                        }
                    ></Image>
                </Box>
                <VStack alignItems={'flex-start'}>
                    <HStack gap={2}>
                        <Text fontWeight={'extrabold'} fontSize={'4xl'}>
                            {user?.name},{' '}
                            {user?.birthday && getAgeByDate(user.birthday)}
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

                    <Flex gap={2}>
                        <Text>{user?.gender === 'man' ? '👨' : '👩'}</Text>
                        <Text>{user?.gender}</Text>
                    </Flex>
                    <Flex gap={2}>
                        <Text>{flag && <Image src={flag} w={6} />}</Text>
                        <Text>
                            {city && city + ','}
                            {'  '} {country && country}
                        </Text>
                    </Flex>
                </VStack>
                <Flex
                    flex={1}
                    alignItems={'flex-end'}
                    justifyContent={'flex-end'}
                >
                    <Button
                        colorScheme="teal"
                        variant="solid"
                        rightIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                    >
                        Message
                    </Button>
                </Flex>
            </Flex>
            {/* <Flex maxH={'450px'} bg={'teal.100'}>
                {user?.bio ? (
                    user?.userImages.length < 1 ? (
                        <>
                            <Flex flex={1} bg={'teal.100'}>
                                {renderBio}
                            </Flex>
                        </>
                    ) : (
                        <>
                            <Flex flex={1}>
                                {renderImage(
                                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                )}
                            </Flex>
                            <Flex flex={1} bg={'teal.100'}>
                                {renderBio}
                            </Flex>
                        </>
                    )
                ) : user?.userImages.length < 1 ? (
                    <>
                        <Flex
                            h={'450px'} // Définir la hauteur à 450px pour occuper toute la hauteur du conteneur parent
                            bg={'teal.100'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            flex={1} // Assurez-vous que ce Flex prend toute la largeur disponible
                        >
                            {renderLanguages}
                        </Flex>
                        <Flex flex={1}>{renderMap}</Flex>
                    </>
                ) : (
                    <>
                        <Flex flex={1}>
                            {renderImage(
                                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            )}
                        </Flex>
                        <Flex
                            flex={1}
                            bg={'teal.100'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            {renderLanguages}
                        </Flex>
                    </>
                )}
            </Flex> */}
            {profileContent}
            {/* {user?.userImages.length > 0 && (} */}
            {/* <Flex maxH={'450px'}>
                {user?.bio ? (
                    <>
                        <Flex flex={1}>{renderLanguages}</Flex>
                        <Flex flex={1}>{renderMap}</Flex>
                    </>
                ) : (
                    <Flex flex={1}>{renderMap}</Flex>
                )}
            </Flex> */}
            {/* <Flex maxH={'450px'}>
                <Flex flex={1}>
                    {renderImage(
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    )}
                </Flex>
                <Flex
                    flex={1}
                    bg={'teal.100'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    {renderBio}
                </Flex>
            </Flex>
            <Flex>
                <Flex
                    flex={1}
                    bg={'teal.100'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    {renderLanguages}
                </Flex>
                <Flex flex={1} position={'relative'}>
                    {renderMap}
                </Flex>
            </Flex>
            <Flex maxH={'450px'}>
                <Flex flex={1}>
                    {renderImage(
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    )}
                </Flex>
                <Flex flex={1}>
                    {renderImage(
                        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                    )}
                </Flex>
            </Flex> */}
        </Box>
    )
}
export default Profile
