import { View } from 'ol'
import { useEffect, useRef } from 'react'
import { Map as OLMap } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { Box } from '@chakra-ui/react'
import 'ol/ol.css'

const Map = () => {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mapRef.current) return null

        const map = new OLMap({
            target: mapRef.current,
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

        return () => {
            map.setTarget(null)
        }
    }, [])

    return <Box ref={mapRef} h={'full'} w={'full'} className="map"></Box>
}
export default Map
