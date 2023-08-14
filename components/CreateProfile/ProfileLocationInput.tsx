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
import 'ol/ol.css'

import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

type Props = {
    onNextStep?: () => void
    onPreviousStep?: () => void
    setValue?: UseFormSetValue<ProfileFormData>
}

const ProfileLocationInput = (props: Props) => {
    const { setValue } = props
    const mapRef = useRef<Map | null>(null)

    const ref = useRef<HTMLDivElement>(null)
    const markerRef = useRef<HTMLDivElement>(null)
    const [, setShowMarker] = useState(false)

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

            const handleClicked = (e) => {
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
                    setValue('latitude', transformedCoordinates[0])
                    setValue('longitude', transformedCoordinates[1])
                }

                setShowMarker(true)
            }

            mapRef.current.on('click', handleClicked)
        }
    }, [ref, mapRef, setValue])

    return (
        <Box ref={ref} height={['200px', 'sm']} width={['100%', '3xl']}>
            <Box display={'none'}>
                <Box ref={markerRef}>
                    <FontAwesomeIcon icon={faLocationDot} size="lg" />
                </Box>
            </Box>
        </Box>
    )
}

export default ProfileLocationInput
