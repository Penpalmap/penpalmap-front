import { Flex, Box, Text } from '@chakra-ui/react'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef } from 'react'
import { User } from '../../types'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat, transformExtent } from 'ol/proj'
import { Map as OLMap, View } from 'ol'
import userStyle from '../../styles/openlayer/UserStyle'
import XYZ from 'ol/source/XYZ'

type MapProfileProps = {
  user: User
  country: string
}
const loadMapData = (user) => {
  return new Promise((resolve, reject) => {
    if (user && user.geom && user.geom.coordinates) {
      resolve(user)
    } else {
      reject('No data')
    }
  })
}

const MapProfile = ({ user, country }: MapProfileProps) => {
  const mapRefContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<OLMap | null>(null)

  useEffect(() => {
    if (!user || !mapRefContainer.current) return undefined

    const map = new OLMap({
      target: mapRefContainer.current,
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
        center: fromLonLat(user.geom.coordinates),
        zoom: 7,
        extent: transformExtent(
          [-999.453125, -58.813742, 999.453125, 70.004962],
          'EPSG:4326',
          'EPSG:3857'
        ),
      }),
      interactions: [],
    })

    mapRef.current = map

    const userSource = new VectorSource()

    const userLayer = new VectorLayer({
      source: userSource,
      style: userStyle,
    })

    mapRef.current.addLayer(userLayer)

    const coordinates = user.geom ? fromLonLat(user.geom.coordinates) : [0, 0]

    const userFeature = new Feature({
      geometry: new Point(coordinates),
      element: {
        ...user,
        strokeColor: '#FFFFFF',
      },
    })

    userSource.addFeatures([userFeature])

    return () => {
      map.setTarget(undefined)
      mapRef.current?.removeLayer(userLayer)
    }
  }, [user])

  useEffect(() => {
    loadMapData(user).catch((error) => console.error(error))
  }, [user])

  return (
    <>
      <Box
        ref={mapRefContainer}
        h={['400px', '450px']}
        w={'full'}
        className="map"
        borderRadius={'xl'}
      ></Box>
      <Flex
        alignItems={'center'}
        position={'absolute'}
        bottom={'5'}
        left={'5'}
        zIndex={1}
      >
        <FontAwesomeIcon icon={faMapPin} color="#494949" />
        <Text
          fontWeight={'semibold'}
          letterSpacing={'wider'}
          color={'gray.600'}
          ml={'2'}
        >
          Around
        </Text>
        <Text fontWeight={'bold'} ml={1}>
          {country}
        </Text>
      </Flex>
    </>
  )
}

export default MapProfile
