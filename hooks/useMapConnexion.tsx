import { useEffect, useRef } from 'react'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { Feature, Map as OLMap } from 'ol'
import fictives from '../data/fictives.json'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import Photo from './../styles/openlayer/Photo'
import { Point } from 'ol/geom'
import Stroke from 'ol/style/Stroke'
import XYZ from 'ol/source/XYZ'

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
                    source: new XYZ({
                        url: 'https://api.mapbox.com/styles/v1/gabnoire/cjpzpqvr03a5h2sqidpht5qhm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2Fibm9pcmUiLCJhIjoiY2p0ZmhtYTVvMDVqcDQzb2NiYXY1YW4xMyJ9.9AquqYCdPTiPiDNmh7dMhQ',
                        crossOrigin: 'anonymous',
                    }),
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
