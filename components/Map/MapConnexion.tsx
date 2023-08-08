import { Box } from '@chakra-ui/react'
import 'ol/ol.css'
import useMapConnexion from '../../hooks/useMapConnexion'

const MapConnexion = () => {
    const { mapContainerRef } = useMapConnexion({
        center: [0, 0],
        zoom: 2,
    })

    return (
        <Box ref={mapContainerRef} h={'80vh'} w={'full'} className="map"></Box>
    )
}
export default MapConnexion
