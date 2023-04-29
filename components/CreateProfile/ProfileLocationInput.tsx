import { Box } from '@chakra-ui/react'
import { Map } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { useEffect, useRef } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import OSM from 'ol/source/OSM'
import View from 'ol/View'
import { ProfileFormData } from '../../types'
import { transform } from 'ol/proj'

type Props = {
    onNextStep?: () => void
    onPreviousStep?: () => void
    register?: UseFormRegister<ProfileFormData>
    setValue?: UseFormSetValue<ProfileFormData>
}

const ProfileLocationInput = (props: Props) => {
    const { register, setValue } = props
    const mapRef = useRef<Map>(null)
    const ref = useRef<HTMLDivElement>(null)

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
                setValue(
                    'location',
                    transform(coordinates, 'EPSG:3857', 'EPSG:4326')
                )
            }

            mapRef.current.on('click', handleClicked)
        }
    }, [ref, mapRef, setValue])

    return (
        <Box ref={ref} height="sm" width="3xl">
            <h1>create profile Location</h1>
        </Box>
    )
}

export default ProfileLocationInput
