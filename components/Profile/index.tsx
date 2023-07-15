import {
    Box,
    Button,
    CloseButton,
    Divider,
    Flex,
    HStack,
    Image,
    Text,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { User } from '../../types'
import { getProfile } from '../../api/profileApi'
import { getAgeByDate } from '../../utils/date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getCountryByCoords } from '../../utils/location'
import {
    faArrowRight,
    faMapMarked,
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

type Props = {
    profileId: string
}

const Profile = ({ profileId }: Props) => {
    const [user, setUser] = useState<User | null>(null)
    const [country, setCountry] = useState<string | null>(null)

    const mapRef = useRef<OLMap | null>(null)
    const mapRefContainer = useRef<HTMLDivElement>(null)

    const router = useRouter()

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
                center: fromLonLat([user?.latitude, user?.longitude]),
                zoom: 4.5,
                minZoom: 3.5,
                maxZoom: 9,
                extent: transformExtent(
                    [-999.453125, -58.813742, 999.453125, 70.004962],
                    'EPSG:4326',
                    'EPSG:3857'
                ),
            }),
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

        const userFeature = new Feature({
            geometry: new Point(fromLonLat([user.latitude, user.longitude])),
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

            console.log(user)
        }

        fetchUser()
    }, [profileId])

    useEffect(() => {
        const fetchCountry = async () => {
            if (!user) return
            const country = await getCountryByCoords(
                user.latitude,
                user.longitude
            )
            setCountry(country)
        }

        fetchCountry()
    }, [user])

    const onClose = () => {
        router.push('/')
    }

    return (
        user && (
            <Box p={'8'}>
                <CloseButton
                    position={'absolute'}
                    top={'4'}
                    right={'4'}
                    onClick={onClose}
                />
                <Flex alignItems={'center'} mb={'8'}>
                    <Box mr={'8'}>
                        <Image
                            src={user?.image}
                            alt="profile image"
                            boxSize="150px"
                            objectFit="cover"
                            borderRadius={'full'}
                        />
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'} fontSize={'4xl'}>
                            {user?.name}
                        </Text>
                        <Box>
                            <HStack
                                spacing={'2'}
                                mb={'2'}
                                alignItems={'center'}
                            >
                                <FontAwesomeIcon
                                    icon={faMapMarked}
                                    color="#494949"
                                />
                                <Text color={'gray.800'}>{country}</Text>
                            </HStack>
                            <HStack
                                spacing={'2'}
                                alignItems={'center'}
                                mb={'2'}
                            >
                                <Text>
                                    {user.gender === 'women' ? '👩' : '👨'}
                                </Text>
                                <Text color={'gray.800'}>{user.gender}</Text>
                            </HStack>
                            <HStack
                                spacing={'2'}
                                alignItems={'center'}
                                mb={'2'}
                            >
                                <Text>🎂</Text>
                                <Text color={'gray.800'}>
                                    {getAgeByDate(user.birthday)}
                                </Text>
                            </HStack>
                        </Box>
                    </Box>
                </Flex>
                <HStack spacing={'2'} mb={'8'}>
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                        colorScheme="teal"
                        variant="solid"
                    >
                        Message
                    </Button>
                    <Button
                        rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                        colorScheme="teal"
                        variant="outline"
                    >
                        Add to friends
                    </Button>
                </HStack>

                <Divider mb={'8'} />

                <Box mb={'8'}>
                    <Text
                        fontWeight={'semibold'}
                        letterSpacing={'wider'}
                        color={'gray.600'}
                    >
                        A PROPOS
                    </Text>
                    <Text>
                        {user.bio} Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Quisquam expedita aliquid, ducimus
                        tempore optio soluta fugit recusandae ut dolore iste
                        odio sapiente nostrum fugiat commodi aperiam porro
                        repudiandae a cum.
                    </Text>
                </Box>

                <HStack mb={'10'}>
                    {user?.userImages.map((image) => (
                        <Box key={image.position}>
                            <Image
                                src={image.src}
                                alt="profile image"
                                boxSize="300px"
                                objectFit="cover"
                                borderRadius={'xl'}
                            />
                        </Box>
                    ))}
                </HStack>

                <HStack alignItems={'cneter'} mb={'2'}>
                    <FontAwesomeIcon icon={faMapPin} color="#494949" />
                    <Text
                        fontWeight={'semibold'}
                        letterSpacing={'wider'}
                        color={'gray.600'}
                    >
                        Around
                    </Text>
                    <Text fontWeight={'bold'}>{country}</Text>
                </HStack>
                <Box
                    ref={mapRefContainer}
                    h={'500px'}
                    w={'full'}
                    className="map"
                    borderRadius={'xl'}
                ></Box>
            </Box>
        )
    )
}
export default Profile
