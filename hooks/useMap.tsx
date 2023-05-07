import { useEffect, useRef, useState } from 'react'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import { Feature, Map as OLMap } from 'ol'
import { getUsersInMap } from '../api/userApi'
import VectorSource from 'ol/source/Vector'
import Cluster from 'ol/source/Cluster'
import VectorLayer from 'ol/layer/Vector'
import { Point } from 'ol/geom'
import clusterStyle from '../styles/openlayer/ClusterStyle'

interface UseMapOptions {
    center: [number, number]
    zoom: number
}

interface UseMapResult {
    mapObj: React.MutableRefObject<OLMap>
    mapContainerRef: React.MutableRefObject<HTMLDivElement>
}

const useMap = ({}: UseMapOptions): UseMapResult => {
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapObj = useRef<OLMap | null>(null)
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const users = await getUsersInMap()
        setUsers(users)
    }

    // Initialize the map
    useEffect(() => {
        if (!mapContainerRef.current) return null

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

        getUsers()

        mapObj.current = map

        return () => {
            map.setTarget(null)
        }
    }, [])

    // Add users to the map
    useEffect(() => {
        if (!mapObj.current) return null

        setTimeout(() => {
            const userSource = new VectorSource()

            const clusterSource = new Cluster({
                distance: 40,
                source: userSource,
            })

            const userLayer = new VectorLayer({
                source: clusterSource,
                style: clusterStyle,
            })

            mapObj.current.addLayer(userLayer)

            // add features to the source for users
            const features = users.map((user) => {
                const { latitude, longitude } = user
                return new Feature({
                    geometry: new Point(fromLonLat([latitude, longitude])),
                    element: user,
                })
            })

            userSource.addFeatures(features)
        }, 2000)
    }, [users])

    return { mapObj, mapContainerRef }
}

export default useMap
