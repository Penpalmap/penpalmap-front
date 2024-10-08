import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import View from 'ol/View'
import { ScaleLine, defaults as defaultControls } from 'ol/control'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat, transformExtent } from 'ol/proj'
import { Feature, Map as OLMap, Overlay } from 'ol'
import { getUsersInMap } from '../api/map/mapApi'
import VectorSource from 'ol/source/Vector'
import Cluster from 'ol/source/Cluster'
import VectorLayer from 'ol/layer/Vector'
import { Point } from 'ol/geom'
import clusterStyle from '../styles/openlayer/ClusterStyle'
import { AppContext } from '../context/AppContext'
import { useSession } from '../hooks/useSession'
import { User, UserElement, UserMap } from '../types'
import XYZ from 'ol/source/XYZ'
import { useRoom } from '../context/RoomsContext'
import { pulse } from '../styles/openlayer/pulseFunctions'

interface UseMapResult {
  mapObj: React.RefObject<OLMap>
  mapContainerRef: React.RefObject<HTMLDivElement>
  overlayRef: Overlay | null
}

const useMap = (): UseMapResult => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapObj = useRef<OLMap | null>(null)
  const [users, setUsers] = useState<UserMap[]>([])
  const [appData, setData] = useContext(AppContext)
  const { rooms } = useRoom()
  const { user: currentUser } = useSession()

  const overlayRef = useRef<Overlay | null>(null)

  const getUsers = useCallback(async () => {
    if (currentUser) {
      const users = await getUsersInMap()
      setUsers(users)
    }
  }, [currentUser])

  // Pour changer le style du curseur quand il survole un user
  const onPointermove = useCallback((e) => {
    e.preventDefault()
    if (!mapObj.current) return
    const pixel = mapObj.current.getEventPixel(e.originalEvent)
    const hit = mapObj.current.hasFeatureAtPixel(pixel)
    const target = mapObj.current.getTarget() as HTMLElement
    target.style.cursor = hit ? 'pointer' : ''
  }, [])

  const getUserInCluster = (feature): UserElement | null => {
    let user = null

    if (feature.get('features')) {
      const size = feature.get('features').length

      // Cluster de plusieurs personnes
      if (size > 1) {
        let max = 0
        for (let I = 0; I < size; I++) {
          if (
            parseInt(feature.get('features')[I].get('element').points) === 0 ||
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
        if (user) {
          return user
        }
      }
    }

    return user
  }
  // move map on user chat when click on conversation
  useEffect(() => {
    const geom = appData.chatData.userChat?.geom

    if (!mapObj.current || !geom) return

    const coordinate = fromLonLat([
      geom.coordinates[0] as number,
      geom.coordinates[1] as number,
    ])

    mapObj.current.getView().animate({
      center: coordinate,
      duration: 500,
    })
  }, [appData.chatData.userChat])
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
      geom.coordinates[0] as number,
      geom.coordinates[1] as number,
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
      const feature = mapObj.current.forEachFeatureAtPixel(evt.pixel, (f) => f)

      if (feature) {
        const user = getUserInCluster(feature)

        if (!user) return
        setData((data) => ({
          ...data,
          userTarget: user,
        }))

        showUserOverlay(user)

        mapObj.current.getView().animate({
          center: fromLonLat([
            user.geom?.coordinates[0] ?? 0,
            user.geom?.coordinates[1] ?? 0,
          ]),
          duration: 500,
        })
      }
    },
    [setData, showUserOverlay]
  )

  // Initialize the map
  useEffect(() => {
    if (!mapContainerRef.current) return undefined

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
          currentUser?.geom?.coordinates?.[0] ?? 0,
          currentUser?.geom?.coordinates?.[1] ?? 0,
        ]),
        zoom: 5.5,
        minZoom: 3,
        maxZoom: 9,
        extent: transformExtent(
          [-999.453125, -58.813742, 999.453125, 70.004962],
          'EPSG:4326',
          'EPSG:3857'
        ),
        enableRotation: false,
      }),

      controls: defaultControls({ zoom: true }).extend([
        new ScaleLine({
          units: 'metric',
          bar: false,
        }),
      ]),
    })
    getUsers()
    mapObj.current = map

    return () => {
      map.setTarget()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.geom?.coordinates?.[0], currentUser?.geom?.coordinates?.[1]])

  // Add users to the map
  useEffect(() => {
    if (!mapObj.current) return undefined

    const allUsersSource = new VectorSource()
    const currentUserSource = new VectorSource()

    const allUsersLayer = new VectorLayer({
      source: new Cluster({
        distance: 65,
        source: allUsersSource,
      }),
      style: clusterStyle,
    })

    const currentUserLayer = new VectorLayer({
      source: currentUserSource,
      style: clusterStyle, // Vous pouvez personnaliser ce style si nécessaire
    })

    mapObj.current.addLayer(allUsersLayer)
    mapObj.current.addLayer(currentUserLayer)
    const filteredWithGeom = users.filter((user) => user.id !== currentUser?.id)
    const filteredCurrentUser = users.find(
      (user) => user.id === currentUser?.id
    )

    const allUsersFeatures = filteredWithGeom.map((userElement) => {
      const { geom } = userElement

      // chaque room que l'on a (nous)
      const room = rooms?.find((room) => {
        const otherUser = room.members?.find(
          (member) => member.id !== currentUser?.id
        )

        return otherUser?.id === userElement.id
      })

      return new Feature({
        geometry: new Point(
          fromLonLat([
            geom?.coordinates[0] as number,
            geom?.coordinates[1] as number,
          ])
        ),
        element: {
          ...userElement,
          strokeColor: '#FFFFFF', // couleur pour les autres utilisateurs
          room: room,
        },
      })
    })

    const currentUserFeature = filteredCurrentUser
      ? new Feature({
          geometry: new Point(
            fromLonLat([
              filteredCurrentUser.geom.coordinates[0] ?? 0,
              filteredCurrentUser.geom.coordinates[1] ?? 0,
            ])
          ),
          element: {
            ...filteredCurrentUser,
            points: Infinity,
            strokeColor: '#9de0fc', // couleur spécifique pour l'utilisateur actuel
          },
        })
      : null

    if (currentUserFeature) {
      currentUserSource.addFeature(currentUserFeature)

      setInterval(() => {
        if (!mapObj.current) return
        pulse(currentUserFeature, currentUserLayer, mapObj.current)
      }, 1000)
    }

    allUsersSource.addFeatures(allUsersFeatures)

    mapObj.current.on('click', onClick)
    mapObj.current.on('pointermove', onPointermove)

    return () => {
      mapObj.current?.removeLayer(allUsersLayer)
      mapObj.current?.removeLayer(currentUserLayer)
      mapObj.current?.un('click', onClick)
      mapObj.current?.un('pointermove', onPointermove)
    }
  }, [rooms, onClick, onPointermove, currentUser, users])

  return { mapObj, mapContainerRef, overlayRef: overlayRef.current }
}

export default useMap
