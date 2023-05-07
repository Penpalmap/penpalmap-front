import { Box } from '@chakra-ui/react'
import 'ol/ol.css'
import useMap from '../../hooks/useMap'

const Map = () => {
    const { mapContainerRef } = useMap({
        center: [0, 0],
        zoom: 2,
    })

    return (
        <Box ref={mapContainerRef} h={'full'} w={'full'} className="map"></Box>
    )
}
export default Map
