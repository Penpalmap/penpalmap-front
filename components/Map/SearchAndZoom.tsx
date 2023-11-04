import React, { RefObject } from 'react'
import { fromLonLat } from 'ol/proj'
import CitySearchInput from '../CreateProfile/CitySearchInput'
import { Box } from '@chakra-ui/react'
import { Map } from 'ol'

interface SearchAndZoomProps {
    mapObj: RefObject<Map>
}

const SearchAndZoom: React.FC<SearchAndZoomProps> = ({ mapObj }) => {
    const handleLocationSelected = (lat: string, lon: string) => {
        if (!mapObj.current) return

        const numericLat = parseFloat(lat)
        const numericLon = parseFloat(lon)
        const destination = fromLonLat([numericLon, numericLat]) as [
            number,
            number
        ]

        const view = mapObj.current.getView()
        const currentCenter = view.getCenter() as [number, number] | undefined
        const currentZoom = view.getZoom()

        if (!currentCenter || currentZoom === undefined) return

        const distance = Math.sqrt(
            Math.pow(currentCenter[0] - destination[0], 2) +
                Math.pow(currentCenter[1] - destination[1], 2)
        )

        const intermediateZoom =
            distance < 1000000
                ? currentZoom
                : distance < 6000000
                ? currentZoom - 1
                : currentZoom - 4

        view.animate(
            { zoom: intermediateZoom, duration: 700 },
            { center: destination, duration: 1000 },
            { zoom: 10, duration: 700 }
        )
    }

    return (
        <Box
            position="absolute"
            top="4"
            left="4"
            width="400px"
            maxWidth="100%"
            zIndex="1"
        >
            <CitySearchInput onLocationSelected={handleLocationSelected} />
        </Box>
    )
}

export default SearchAndZoom
