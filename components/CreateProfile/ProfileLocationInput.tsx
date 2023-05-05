import { Box } from '@chakra-ui/react'
import { Map, Overlay } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { useEffect, useRef, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import OSM from 'ol/source/OSM'
import View from 'ol/View'
import { ProfileFormData } from '../../types'
import { transform } from 'ol/proj'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

type Props = {
    onNextStep?: () => void
    onPreviousStep?: () => void
    setValue?: UseFormSetValue<ProfileFormData>
}

const ProfileLocationInput = (props: Props) => {
    const { setValue } = props
    const mapRef = useRef<Map>(null)
    const ref = useRef<HTMLDivElement>(null)
    const markerRef = useRef<HTMLDivElement>(null)
    const [showMarker, setShowMarker] = useState(false)

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

            const handleClicked = (e: any) => {
                const coordinates = mapRef.current.getCoordinateFromPixel(
                    e.pixel
                )
                const transformedCoordinates = transform(
                    coordinates,
                    'EPSG:3857',
                    'EPSG:4326'
                )

                const marker = new Overlay({
                    position: coordinates,
                    element: markerRef.current,
                    positioning: 'bottom-center',
                    stopEvent: false,
                })

                mapRef.current.addOverlay(marker)

                setValue('coordinate', transformedCoordinates)
                setShowMarker(true)
            }

            mapRef.current.on('click', handleClicked)
        }
    }, [ref, mapRef, setValue])

    return (
        <Box>
            <h1>create profile Location</h1>

            <Box ref={ref} height="sm" width="3xl">
                {showMarker && (
                    <Box ref={markerRef}>
                        <FontAwesomeIcon icon={faLocationDot} size="lg" />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default ProfileLocationInput
