import { useEffect, useRef } from 'react'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { Feature, Map as OLMap } from 'ol'
import fictives from '../data/fictives.json'
import { Icon } from '@chakra-ui/react'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import Photo from './../styles/openlayer/Photo'
import { Point } from 'ol/geom'
import Stroke from 'ol/style/Stroke'

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
            interactions: [],
        })

        fictives.forEach((user) => {
            const userFeature = new Feature({
                geometry: new Point(
                    fromLonLat([user.longitude, user.latitude])
                ),
            })

            userFeature.setStyle(
                new Style({
                    image: new Photo({
                        src: user.image,
                        radius: 30,
                        crop: true,
                        kind: 'circle',
                        shadow: 5,
                        stroke: new Stroke({
                            color: '#fff',
                            width: 3,
                        }),
                    }),
                })
            )

            map.addLayer(
                new VectorLayer({
                    source: new VectorSource({ features: [userFeature] }),
                })
            )
        })

        return () => {
            map.setTarget(undefined)
        }
    }, [])

    return { mapObj, mapContainerRef }
}

export default useMapConnexion
