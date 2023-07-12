import {
    Box,
    Flex,
    HStack,
    Heading,
    Image,
    Text,
    position,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { User } from '../../types'
import { getProfile } from '../../api/profileApi'
import { getAgeByDate } from '../../utils/date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getCountryByCoords } from '../../utils/location'
import { faMarker } from '@fortawesome/free-solid-svg-icons'
import { Feature, Map as OLMap, Overlay, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat, transformExtent } from 'ol/proj'
import XYZ from 'ol/source/XYZ'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point } from 'ol/geom'
import { cp } from 'fs'
import userStyle from '../../styles/openlayer/UserStyle'

type Props = {
    profileId: string
}

const Profile = ({ profileId }: Props) => {
    const [user, setUser] = useState<User | null>(null)
    const [country, setCountry] = useState<string | null>(null)

    const mapRef = useRef<OLMap | null>(null)
    const mapRefContainer = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!user || !mapRefContainer.current) return undefined

        const map = new OLMap({
            target: mapRefContainer.current,
            layers: [
                new TileLayer({
                    // source: new OSM(),
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
        if (!mapRef.current) return undefined

        const userSource = new VectorSource()

        const userLayer = new VectorLayer({
            source: userSource,
            style: userStyle,
        })

        mapRef.current.addLayer(userLayer)

        const userFeature = new Feature({
            geometry: new Point(fromLonLat([user?.latitude, user?.longitude])),
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

    return (
        user && (
            <Box>
                <Text fontWeight={'bold'} fontSize={'2xl'}>
                    {user?.name}
                </Text>
                <Flex alignItems={'center'}>
                    <FontAwesomeIcon icon={faMarker} color="#494949" />
                    <Text ml={'2'} color={'gray.800'}>
                        {country}
                    </Text>
                </Flex>
                <Flex>
                    <Text>{getAgeByDate(user.birthday)}</Text>
                    <Text>, 👩 Femme</Text>
                </Flex>
                <Box>
                    <Text>A PROPOS</Text>
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
                                borderRadius={'md'}
                            />
                        </Box>
                    ))}
                </HStack>

                {/* Map zoom on position of the user with the image of the user */}
                <Box
                    ref={mapRefContainer}
                    h={'500px'}
                    w={'full'}
                    className="map"
                ></Box>
            </Box>
        )
    )
}
export default Profile
