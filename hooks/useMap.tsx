import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import View from 'ol/View'
import { defaults as defaultControls } from 'ol/control'
import TileLayer from 'ol/layer/Tile'
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
import { User, UserMap } from '../types'
import XYZ from 'ol/source/XYZ'
import { useRoom } from '../context/RoomsContext'
import { pulse } from '../styles/openlayer/pulseFunctions'

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
    const [users, setUsers] = useState<UserMap[]>([])
    const [, setData] = useContext(AppContext)
    const { rooms } = useRoom()
    const { data: session } = useSession()

    const userLayerRef = useRef<VectorLayer<Cluster> | null>(null)

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
        const target = mapObj.current.getTarget() as HTMLElement
        target.style.cursor = hit ? 'pointer' : ''
    }, [])

    const getUserInCluster = (feature) => {
        let user = null

        // Verifie si ce n'est pas l'utilisateur connecté
        if (feature.get('features')) {
            const size = feature.get('features').length

            // Cluster de plusieurs personnes
            if (size > 1) {
                let max = 0
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
        }
        return user
    }

    const showUserOverlay = useCallback((user: User) => {
        if (
            !mapObj.current ||
            (user.geom?.coordinates[1] === undefined &&
                user.geom?.coordinates[0] === undefined)
        )
            return
        const { geom } = user

        if (!geom) {
            // Gérer le cas où geom est manquant
            return
        }

        const coordinate = fromLonLat([
            geom.coordinates[1] as number,
            geom.coordinates[0] as number,
        ])

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
        if (!mapContainerRef.current || !session?.user) return undefined

        const map = new OLMap({
            target: mapContainerRef.current,
            layers: [
                new TileLayer({
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
                    session?.user?.geom?.coordinates?.[1] || 0,
                    session?.user?.geom?.coordinates?.[0] || 0,
                ]),
                zoom: 5.5,
                minZoom: 4.5,
                maxZoom: 9,
                extent: transformExtent(
                    [-999.453125, -58.813742, 999.453125, 70.004962],
                    'EPSG:4326',
                    'EPSG:3857'
                ),
            }),

            controls: defaultControls({ zoom: false }),
        })

        getUsers()

        mapObj.current = map

        return () => {
            map.setTarget(undefined)
        }
    }, [session?.user])

    // Add users to the map
    useEffect(() => {
        if (!mapObj.current) return undefined

        const userSource = new VectorSource()

        const clusterSource = new Cluster({
            distance: 55,
            source: userSource,
        })

        const userLayer = new VectorLayer({
            source: clusterSource,
            style: clusterStyle,
        })

        userLayerRef.current = userLayer

        mapObj.current.addLayer(userLayer)

        const filteredWithGeom = users.filter((user) => {
            return (
                user.geom?.coordinates &&
                user.geom?.coordinates.length > 0 &&
                user.geom?.coordinates[1] &&
                user.geom?.coordinates[0]
            )
        })

        // add features to the source for users
        const features = filteredWithGeom.map((user) => {
            const { geom } = user

            const room = rooms?.find((room) => {
                const otherUser = room.members.find(
                    (member) => member.id !== session?.user.id
                )

                return otherUser?.id === user.id
            })

            const otherMemberOnline = room?.members.find(
                (member) => member.isOnline && member.id !== session?.user.id
            )

            return new Feature({
                geometry: new Point(
                    fromLonLat([
                        geom.coordinates[1] as number,
                        geom.coordinates[0] as number,
                    ])
                ),
                element: {
                    ...user,
                    strokeColor:
                        user.id === session?.user?.id ? '#9de0fc' : '#FFFFFF',
                    room: room,
                    isOnline: otherMemberOnline?.isOnline,
                },
            })
        })

        // Remove null entries from the features array
        const filteredFeatures = features.filter((feature) => feature !== null)

        mapObj.current.once('rendercomplete', () => {
            userSource.addFeatures(filteredFeatures)
        })

        mapObj.current.on('click', onClick)
        mapObj.current.on('pointermove', onPointermove)

        setInterval(() => {
            if (!mapObj.current) return
            const features = userSource.getFeatures()
            features.forEach((feature) => {
                const user = feature.get('element')
                if (user?.id === session?.user?.id) {
                    pulse(feature, userLayer, mapObj.current)
                }
            })
        }, 1000)

        return () => {
            mapObj.current?.removeLayer(userLayer)
            mapObj.current?.un('click', onClick)
            mapObj.current?.un('pointermove', onPointermove)
        }
    }, [rooms, onClick, onPointermove, session?.user?.id, users])

    return { mapObj, mapContainerRef, overlayRef: overlayRef.current }
}

export default useMap
