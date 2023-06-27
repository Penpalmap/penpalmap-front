import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import { Feature, Map as OLMap, Overlay } from 'ol'
import { getUsersInMap } from '../api/userApi'
import VectorSource from 'ol/source/Vector'
import Cluster from 'ol/source/Cluster'
import VectorLayer from 'ol/layer/Vector'
import { Point } from 'ol/geom'
import clusterStyle from '../styles/openlayer/ClusterStyle'
import { AppContext } from '../context/AppContext'
import { useSession } from 'next-auth/react'
import { User } from '../types'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Badge, Box, Text } from '@chakra-ui/react'
import OverlayProfileMap from '../components/Map/OverlayProfileMap'

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

    const overlayRef = useRef<Overlay | null>(null)
    const overlayContentRef = useRef<HTMLDivElement>(null)

    const getUsers = async () => {
        const users = await getUsersInMap()
        setUsers(users)
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

    const closeOverlay = useCallback(() => {
        if (!mapObj.current || !overlayRef.current) return
        mapObj.current.removeOverlay(overlayRef.current)
    }, [])

    const showUserOverlay = useCallback((user: User) => {
        if (
            !mapObj.current ||
            !overlayRef.current ||
            !overlayContentRef.current
        )
            return

        const { latitude, longitude, name } = user

        const coordinate = fromLonLat([latitude, longitude])

        overlayRef.current.setPosition(coordinate)

        createRoot(overlayContentRef.current).render(
            <OverlayProfileMap user={user} closeOverlay={closeOverlay} />
        )

        mapObj.current.addOverlay(overlayRef.current)

        return () => {
            if (mapObj?.current && overlayRef?.current) {
                mapObj?.current.removeOverlay(overlayRef?.current)
            }
        }
    }, [])

    const onClick = useCallback(
        (evt) => {
            if (!mapObj.current) return
            const feature = mapObj.current.forEachFeatureAtPixel(
                evt.pixel,
                (f) => f
            )

            if (feature) {
                const user = getUserInCluster(feature)

                if (!user) return
                setData((data) => ({
                    ...data,
                    userTarget: user,
                }))
                showUserOverlay(user)
            }
        },
        [setData, showUserOverlay]
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
                element: {
                    ...user,
                    strokeColor:
                        user.id === session?.user?.id ? '#9de0fc' : '#FFFFFF',
                },
            })
        })

        userSource.addFeatures(features)
        const overlayElement = document.createElement('div')
        overlayElement.classList.add('user-overlay')
        overlayContentRef.current = overlayElement

        overlayRef.current = new Overlay({
            element: overlayElement,
            positioning: 'bottom-center',
            offset: [0, -50],
            stopEvent: false,
        })

        mapObj.current.on('click', onClick)
        mapObj.current.on('pointermove', onPointermove)
    }, [onClick, onPointermove, session?.user?.id, users])

    return { mapObj, mapContainerRef }
}

export default useMap
