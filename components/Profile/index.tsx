import {
    Badge,
    Box,
    Button,
    CloseButton,
    Flex,
    HStack,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react'
import { useEffect, useRef, useState, useContext, useMemo } from 'react'
import { User } from '../../types'
import { getProfile } from '../../api/profileApi'
import { getAgeByDate } from '../../utils/date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    getFlagByCountryCode,
    getPositionDataByCoords,
} from '../../utils/location'
import {
    faArrowRight,
    faChevronLeft,
    faMapPin,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import { Feature, Map as OLMap, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat, transformExtent } from 'ol/proj'
import XYZ from 'ol/source/XYZ'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point } from 'ol/geom'
import userStyle from '../../styles/openlayer/UserStyle'
import { useRouter } from 'next/router'
import { AppContext } from '../../context/AppContext'
import { useMobileView } from '../../context/MobileViewContext'
import { useSession } from '../../hooks/useSession'
import useLocation from '../../hooks/useLocation'

type Props = {
    profileId: string
}

const Profile = ({ profileId }: Props) => {
    const mapRefContainer = useRef<HTMLDivElement>(null)
    const mapRef = useRef<OLMap | null>(null)

    const [user, setUser] = useState<User | null>(null)
    const { country, flag, city } = useLocation(
        user?.geom.coordinates[1],
        user?.geom.coordinates[0]
    )

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

    const renderLanguages = useMemo(() => {
        if (!user) return null

        return user.userLanguages.map((language) => (
            <Badge
                key={language.id}
                variant={'solid'}
                borderRadius={'full'}
                px={2}
            >
                {language.language}
            </Badge>
        ))
    }, [user])

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
            <Flex maxH={'450px'}>
                <Flex flex={1} bg={'red'}>
                    <Image
                        w={'100%'}
                        h={'100%'} // Définir la hauteur à 100% pour remplir le conteneur
                        maxW={'100%'}
                        objectFit="cover" // Ajouté pour maintenir les proportions de l'image tout en la remplissant
                        src={
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        }
                    />
                </Flex>
                <Flex
                    flex={1}
                    bg={'teal.100'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
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
                            Coucou tout le monde, moi c’est Louise et je fais
                            beaucoup de sport je suis drole et j’aime les chiens
                            et les chat Mais j’aime également les éléphants 🐘
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex>
                <Flex
                    flex={1}
                    bg={'teal.100'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Flex
                        direction={'column'}
                        w={'80%'}
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
                            Languages
                        </Text>
                        <VStack>{renderLanguages}</VStack>
                    </Flex>
                </Flex>
                <Flex flex={1} position={'relative'}>
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
                </Flex>
            </Flex>
            <Flex maxH={'450px'}>
                <Flex flex={1} bg={'red'}>
                    <Image
                        w={'100%'}
                        h={'100%'} // Définir la hauteur à 100% pour remplir le conteneur
                        maxW={'100%'}
                        objectFit="cover" // Ajouté pour maintenir les proportions de l'image tout en la remplissant
                        src={
                            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        }
                    />
                </Flex>
                <Flex flex={1} bg={'red'}>
                    <Image
                        w={'100%'}
                        h={'100%'} // Définir la hauteur à 100% pour remplir le conteneur
                        maxW={'100%'}
                        objectFit="cover" // Ajouté pour maintenir les proportions de l'image tout en la remplissant
                        src={
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        }
                    />
                </Flex>
            </Flex>
        </Box>
    )

    // const [user, setUser] = useState<User | null>(null)
    // const [country, setCountry] = useState<string | null>(null)
    // const [flagUrl, setFlagUrl] = useState<string | null>(null)

    // const mapRef = useRef<OLMap | null>(null)
    // const mapRefContainer = useRef<HTMLDivElement>(null)

    // const [appData, setAppData] = useContext(AppContext)

    // const router = useRouter()

    // const { setMobileView } = useMobileView()

    // useEffect(() => {
    //     if (!user || !mapRefContainer.current) return undefined

    //     const map = new OLMap({
    //         target: mapRefContainer.current,
    //         layers: [
    //             new TileLayer({
    //                 preload: Infinity,
    //                 zIndex: 0,

    //                 source: new XYZ({
    //                     url: 'https://api.mapbox.com/styles/v1/gabnoire/cjpzpqvr03a5h2sqidpht5qhm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2Fibm9pcmUiLCJhIjoiY2p0ZmhtYTVvMDVqcDQzb2NiYXY1YW4xMyJ9.9AquqYCdPTiPiDNmh7dMhQ',
    //                     crossOrigin: 'anonymous',
    //                 }),
    //             }),
    //         ],

    //         view: new View({
    //             center: fromLonLat(user.geom.coordinates),
    //             zoom: 7,
    //             extent: transformExtent(
    //                 [-999.453125, -58.813742, 999.453125, 70.004962],
    //                 'EPSG:4326',
    //                 'EPSG:3857'
    //             ),
    //         }),
    //         interactions: [],
    //     })

    //     mapRef.current = map

    //     return () => {
    //         map.setTarget(undefined)
    //     }
    // }, [user])

    // useEffect(() => {
    //     if (!mapRef.current || !user) return undefined

    //     const userSource = new VectorSource()

    //     const userLayer = new VectorLayer({
    //         source: userSource,
    //         style: userStyle,
    //     })

    //     mapRef.current.addLayer(userLayer)

    //     const coordinates = user.geom
    //         ? fromLonLat(user.geom.coordinates)
    //         : [0, 0]

    //     const userFeature = new Feature({
    //         geometry: new Point(coordinates),
    //         element: {
    //             ...user,
    //             strokeColor: '#FFFFFF',
    //         },
    //     })

    //     userSource.addFeatures([userFeature])

    //     return () => {
    //         mapRef.current?.removeLayer(userLayer)
    //     }
    // }, [user])

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const user = await getProfile(profileId)
    //         setUser(user)
    //     }

    //     fetchUser()
    // }, [profileId])

    // useEffect(() => {
    //     const fetchCountry = async () => {
    //         if (!user) return

    //         const coordinates = user.geom ? user.geom.coordinates : [0, 0]

    //         if (coordinates[0] && coordinates[1]) {
    //             const positionData = await getPositionDataByCoords(
    //                 coordinates[0],
    //                 coordinates[1]
    //             )
    //             setCountry(positionData?.address?.country)

    //             const flagUrlData = await getFlagByCountryCode(
    //                 positionData?.address?.country_code.toUpperCase()
    //             )
    //             setFlagUrl(flagUrlData)
    //         }
    //     }

    //     fetchCountry()
    // }, [user])

    // const onClose = () => {
    //     router.push('/')
    // }

    // const onOpenChat = () => {
    //     router.push('/')
    //     setAppData({
    //         ...appData,
    //         userChat: user,
    //         chatOpen: true,
    //     })

    //     setMobileView('chat')
    // }

    // return (
    //     user && (
    //         <Box>
    //             <CloseButton
    //                 position={'absolute'}
    //                 top={'4'}
    //                 right={'4'}
    //                 onClick={onClose}
    //             />
    //             <Button
    //                 onClick={() => setMobileView('home')}
    //                 leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
    //                 variant={'ghost'}
    //             >
    //                 Retour
    //             </Button>
    //             <Flex
    //                 alignItems={'center'}
    //                 justifyContent={'space-between'}
    //                 bg={' #E3F7F3'}
    //                 p={10}
    //                 flexDir={['column', 'row']}
    //             >
    //                 <Flex alignItems={'center'} flexDir={['column', 'row']}>
    //                     <Box mr={'8'}>
    //                         <Image
    //                             src={user?.userImages[0]?.src}
    //                             alt="profile image"
    //                             boxSize="150px"
    //                             objectFit="cover"
    //                             borderRadius={'full'}
    //                         />
    //                     </Box>
    //                     <Box>
    //                         <Text fontWeight={'bold'} fontSize={'4xl'}>
    //                             {user?.name}
    //                         </Text>
    //                         <Box>
    //                             <HStack mb={'2'} alignItems={'center'} w={'44'}>
    //                                 <Flex flex={1}>
    //                                     <Box w={'full'}>
    //                                         {flagUrl && (
    //                                             <Image
    //                                                 src={flagUrl}
    //                                                 alt="flag of the country"
    //                                             />
    //                                         )}
    //                                     </Box>
    //                                 </Flex>
    //                                 <Box flex={4}>
    //                                     <Text color={'gray.800'}>
    //                                         {country}
    //                                     </Text>
    //                                 </Box>
    //                             </HStack>
    //                             <HStack alignItems={'center'} mb={'2'} w={'44'}>
    //                                 <Box flex={1}>
    //                                     <Text fontSize={'2xl'}>
    //                                         {user.gender === 'women'
    //                                             ? '👩'
    //                                             : '👨'}
    //                                     </Text>
    //                                 </Box>
    //                                 <Box flex={4}>
    //                                     <Text color={'gray.800'}>
    //                                         {user.gender}
    //                                     </Text>
    //                                 </Box>
    //                             </HStack>
    //                             <HStack alignItems={'center'} mb={'2'} w={'44'}>
    //                                 <Box flex={1}>
    //                                     <Text fontSize={'2xl'}>🎂</Text>
    //                                 </Box>
    //                                 <Box flex={4}>
    //                                     <Text color={'gray.800'}>
    //                                         {getAgeByDate(user.birthday)}yo
    //                                     </Text>
    //                                 </Box>
    //                             </HStack>
    //                         </Box>
    //                     </Box>
    //                 </Flex>
    //                 <VStack alignItems={'stretch'} alignSelf={'flex-end'}>
    //                     <Button
    //                         leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
    //                         colorScheme="teal"
    //                         variant="solid"
    //                         onClick={onOpenChat}
    //                     >
    //                         Message
    //                     </Button>
    //                     <Button
    //                         rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
    //                         colorScheme="teal"
    //                         variant="outline"
    //                         bg={'white'}
    //                     >
    //                         Add to friends
    //                     </Button>
    //                 </VStack>
    //             </Flex>
    //             <Flex flexDir={['column', 'row']} mt={'8'}>
    //                 <Box mb={'8'} p={10} flex={'2'}>
    //                     <Box mb={'4'}>
    //                         <Text
    //                             fontWeight={'semibold'}
    //                             letterSpacing={'wider'}
    //                             color={'gray.600'}
    //                         >
    //                             A PROPOS
    //                         </Text>
    //                         <Text
    //                             color={'gray.800'}
    //                             fontFamily={'Montserrat'}
    //                             fontSize={'md'}
    //                             fontWeight={'400'}
    //                             fontStyle={'normal'}
    //                             lineHeight={'176.4%'}
    //                         >
    //                             {user.bio} Lorem ipsum, dolor sit amet
    //                             consectetur adipisicing elit. Quisquam expedita
    //                             aliquid, ducimus tempore optio soluta fugit
    //                             recusandae ut dolore iste odio sapiente nostrum
    //                             fugiat commodi aperiam porro repudiandae a cum.
    //                         </Text>
    //                     </Box>
    //                     <Box>
    //                         <Text
    //                             mb={'4'}
    //                             fontWeight={'semibold'}
    //                             letterSpacing={'wider'}
    //                             color={'gray.600'}
    //                         >
    //                             PHOTOS
    //                         </Text>

    //                         <Flex
    //                             wrap={'wrap'}
    //                             justifyContent={'center'} // Pour centrer horizontalement
    //                             alignItems={'center'} // Pour centrer verticalement
    //                             gap={'20px'} // Espace entre les images
    //                         >
    //                             {user?.userImages.map((image) => (
    //                                 <Box key={image.position}>
    //                                     <Image
    //                                         src={image.src}
    //                                         alt="profile image"
    //                                         boxSize={[
    //                                             '100px',
    //                                             '150px',
    //                                             '200px',
    //                                             '300px',
    //                                         ]} // Tailles en fonction du responsive
    //                                         objectFit="cover"
    //                                         borderRadius={'xl'}
    //                                     />
    //                                 </Box>
    //                             ))}
    //                         </Flex>
    //                     </Box>
    //                 </Box>
    //                 <Box position={'relative'} flex={'2'} h={'800px'}>
    //                     <Flex
    //                         alignItems={'center'}
    //                         position={'absolute'}
    //                         bottom={'5'}
    //                         left={'5'}
    //                         zIndex={1}
    //                     >
    //                         <FontAwesomeIcon icon={faMapPin} color="#494949" />
    //                         <Text
    //                             fontWeight={'semibold'}
    //                             letterSpacing={'wider'}
    //                             color={'gray.600'}
    //                             ml={'2'}
    //                         >
    //                             Around
    //                         </Text>
    //                         <Text fontWeight={'bold'} ml={1}>
    //                             {country}
    //                         </Text>
    //                     </Flex>
    //                     <Box
    //                         ref={mapRefContainer}
    //                         h={['400px', '800px']}
    //                         w={'full'}
    //                         className="map"
    //                         borderRadius={'xl'}
    //                     ></Box>
    //                 </Box>
    //             </Flex>
    //         </Box>
    //     )
    // )
}
export default Profile
