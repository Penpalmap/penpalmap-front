import { useCallback, useContext, useEffect, useRef, useState } from 'react'
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
import { AppContext } from '../context/AppContext'
import { useSession } from 'next-auth/react'
import { User } from '../types'

interface UseMapOptions {
    center: [number, number]
    zoom: number
}

interface UseMapResult {
    mapObj: React.RefObject<OLMap>
    mapContainerRef: React.RefObject<HTMLDivElement>
}

const useMap = ({}: UseMapOptions): UseMapResult => {
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapObj = useRef<OLMap | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [data, setData] = useContext(AppContext)
    const { data: session } = useSession()

    const getUsers = async () => {
        const users = await getUsersInMap()
        const userwWhithoutMe = users.filter(
            (user) => user.id !== session?.user?.id
        )
        setUsers(userwWhithoutMe)
    }

    // Pour changer le style du curseur quand il survole un user
    const onPointermove = useCallback((e) => {
        e.preventDefault()
        if (!mapObj.current) return
        const pixel = mapObj.current.getEventPixel(e.originalEvent)
        const hit = mapObj.current.hasFeatureAtPixel(pixel)
        mapObj.current.getTarget().style.cursor = hit ? 'pointer' : ''
    }, [])

    const getUserInCluster = (feature) => {
        // Verifie si ce n'est pas l'utilisateur connecté
        if (feature.get('features')) {
            const size = feature.get('features').length

            let user = null

            // Cluster de plusieurs personnes
            if (size > 1) {
                let max = null
                for (let I = 0; I < size; I++) {
                    if (
                        parseInt(
                            feature.get('features')[I].get('element').points
                        ) === 0 ||
                        feature.get('features')[I].get('element').points > max
                    ) {
                        max = feature.get('features')[I].get('element').points
                        user = feature.get('features')[I].get('element')
                    }
                }
            }

            // Cluster d'une seule personne
            else {
                user = feature.get('features')[0].get('element')
            }

            return user
        }
    }

    const onClick = useCallback(
        (evt) => {
            if (!mapObj.current) return
            const feature = mapObj.current.forEachFeatureAtPixel(
                evt.pixel,
                (f) => f
            )

            if (feature) {
                setData((data) => ({
                    ...data,
                    userTarget: getUserInCluster(feature),
                }))
            }
        },
        [setData]
    )

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

        mapObj.current.on('click', onClick)
        mapObj.current.on('pointermove', onPointermove)
    }, [onClick, onPointermove, users])

    return { mapObj, mapContainerRef }
}

export default useMap
