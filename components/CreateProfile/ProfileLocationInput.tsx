import { Box, Text, useToast } from '@chakra-ui/react'
import { Map, Overlay } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { useEffect, useRef, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import OSM from 'ol/source/OSM'
import View from 'ol/View'
import { ProfileFormData } from '../../types'
import { transform } from 'ol/proj'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'ol/ol.css'
import { useTranslation } from 'next-i18next'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import CitySearchInput from './CitySearchInput'

type Props = {
    onNextStep?: () => void
    onPreviousStep?: () => void
    setValue?: UseFormSetValue<ProfileFormData>
}

const ProfileLocationInput = (props: Props) => {
    const { setValue } = props
    const [coordinates, setCoordinates] = useState<[number, number] | null>(
        null
    )
    const [countryName, setCountryName] = useState<string | null>(null)
    const mapRef = useRef<Map | null>(null)

    const ref = useRef<HTMLDivElement>(null)
    const markerRef = useRef<HTMLDivElement>(null)
    const [, setShowMarker] = useState(false)
    const toast = useToast()
    const { t } = useTranslation(['common', 'months'])

    useEffect(() => {
        if (ref.current && !mapRef.current) {
            mapRef.current = new Map({
                target: ref.current,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: [0, 0],
                    zoom: 2,
                }),
            })

            const handleClicked = async (e) => {
                const coordinates = mapRef?.current?.getCoordinateFromPixel(
                    e.pixel
                )

                if (!coordinates) return
                const transformedCoordinates = transform(
                    coordinates,
                    'EPSG:3857',
                    'EPSG:4326'
                )

                if (markerRef.current) {
                    const marker = new Overlay({
                        position: coordinates,
                        element: markerRef.current,
                        positioning: 'bottom-center',
                        stopEvent: false,
                    })
                    mapRef?.current?.addOverlay(marker)
                }

                if (
                    setValue &&
                    transformedCoordinates[0] &&
                    transformedCoordinates[1]
                ) {
                    setValue('latitude', transformedCoordinates[1])
                    setValue('longitude', transformedCoordinates[0])
                }

                // Fetch country name
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${transformedCoordinates[1]}&lon=${transformedCoordinates[0]}`
                    )
                    const data = await response.json()
                    if (data && data.address && data.address.country) {
                        setCountryName(data.address.country)
                    } else {
                        toast({
                            title: 'Hey, explorer! 🚸',
                            description: t('connect.toastLocationOut'),
                            status: 'warning',
                            duration: 5000,
                            isClosable: true,
                        })
                    }
                } catch (error) {
                    console.error('Error fetching country name:', error)
                }

                setShowMarker(true)
            }

            mapRef.current.on('click', handleClicked)
        }
    }, [ref, mapRef, setValue, toast, t])

    const extractCountry = (displayName: string): string => {
        const components = displayName.split(', ')
        return components[components.length - 1] || ''
    }

    useEffect(() => {
        if (mapRef.current && coordinates) {
            const transformedCoordinates = transform(
                coordinates,
                'EPSG:4326',
                'EPSG:3857'
            )
            if (markerRef.current) {
                const marker = new Overlay({
                    position: transformedCoordinates,
                    element: markerRef.current,
                    positioning: 'bottom-center',
                    stopEvent: false,
                })
                mapRef.current.addOverlay(marker)
                mapRef.current.getView().setCenter(transformedCoordinates)
                mapRef.current.getView().setZoom(6)
            }
        }
    }, [coordinates])

    const handleLocationSelected = (
        lat: string,
        lon: string,
        displayName?: string
    ) => {
        const coords: [number, number] = [parseFloat(lat), parseFloat(lon)]

        setCoordinates(coords)
        if (setValue && coords[0] && coords[1]) {
            setValue('latitude', coords[1])
            setValue('longitude', coords[0])
        }

        if (displayName) {
            const country = extractCountry(displayName)
            setCountryName(country)
        }
    }
    return (
        <Box
            position="relative"
            ref={ref}
            height={['200px', 'sm']}
            width={['100%', '3xl']}
        >
            <CitySearchInput
                onLocationSelected={(lat, lon, displayName) =>
                    handleLocationSelected(lat, lon, displayName)
                }
            />
            <Box display={'none'}>
                <Box ref={markerRef}>
                    <FontAwesomeIcon icon={faLocationDot} size="lg" />
                </Box>
            </Box>
            {countryName && (
                <Box
                    mt="3" // Marging pour créer un espace entre la carte et le texte
                    bgColor="white"
                    p="2"
                >
                    You are in:{' '}
                    <Text as="span" color="#189AB4" fontSize="xl">
                        {countryName}
                    </Text>
                </Box>
            )}
        </Box>
    )
}

export default ProfileLocationInput
