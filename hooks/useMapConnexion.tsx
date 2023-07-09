import { useEffect, useRef } from 'react'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { Map as OLMap } from 'ol'

interface UseMapOptions {
    center: [number, number]
    zoom: number
}

interface UseMapConnexionResult {
    mapObj: React.RefObject<OLMap>
    mapContainerRef: React.RefObject<HTMLDivElement>
}

const useMapConnexion = ({}: UseMapOptions): UseMapConnexionResult => {
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapObj = useRef<OLMap>(null)

    // Initialize the map
    useEffect(() => {
        if (!mapContainerRef.current) return undefined

        const map = new OLMap({
            target: mapContainerRef.current,
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
            map.setTarget(undefined)
        }
    }, [])

    return { mapObj, mapContainerRef }
}

export default useMapConnexion
