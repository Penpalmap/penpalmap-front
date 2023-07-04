import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat, transformExtent } from 'ol/proj'
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
import XYZ from 'ol/source/XYZ'
import Control from 'ol/control/Control'

interface UseMapOptions {
    center: [number, number]
    zoom: number
}

interface UseMapResult {
    mapObj: React.RefObject<OLMap>
    mapContainerRef: React.RefObject<HTMLDivElement>
    overlayRef: Overlay | null
}

const useMap = ({}: UseMapOptions): UseMapResult => {
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapObj = useRef<OLMap | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [data, setData] = useContext(AppContext)
    const { data: session } = useSession()

    const overlayRef = useRef<Overlay | null>(null)

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

    const showUserOverlay = useCallback((user: User) => {
        if (!mapObj.current) return
        const { latitude, longitude } = user

        const coordinate = fromLonLat([latitude, longitude])

        overlayRef.current = new Overlay({
            element: document.getElementById('overlay-profile') as HTMLElement,
            positioning: 'bottom-center',
            offset: [0, -50],
            stopEvent: true,
        })

        overlayRef.current.setPosition(coordinate)

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
        if (!mapContainerRef.current || !session?.user) return null

        const map = new OLMap({
            target: mapContainerRef.current,
            layers: [
                new TileLayer({
                    // source: new OSM(),
                    preload: Infinity,
                    zIndex: 0,

                    source: new XYZ({
                        url: 'https://api.mapbox.com/styles/v1/gabnoire/cjpzpqvr03a5h2sqidpht5qhm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2Fibm9pcmUiLCJhIjoiY2p0ZmhtYTVvMDVqcDQzb2NiYXY1YW4xMyJ9.9AquqYCdPTiPiDNmh7dMhQ',
                        crossOrigin: 'anonymous',
                    }),
                }),
            ],
            view: new View({
                center: fromLonLat([
                    session?.user?.latitude,
                    session?.user?.longitude,
                ]),
                zoom: 4.5,
                minZoom: 3.5,
                maxZoom: 9,
                extent: transformExtent(
                    [-999.453125, -58.813742, 999.453125, 70.004962],
                    'EPSG:4326',
                    'EPSG:3857'
                ),
            }),

            //     controls: attribution : false,
            //   zoom : false,
        })

        getUsers()

        mapObj.current = map

        return () => {
            map.setTarget(null)
        }
    }, [session?.user])

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

        mapObj.current.on('click', onClick)
        mapObj.current.on('pointermove', onPointermove)
    }, [onClick, onPointermove, session?.user?.id, users])

    return { mapObj, mapContainerRef, overlayRef: overlayRef.current }
}

export default useMap
