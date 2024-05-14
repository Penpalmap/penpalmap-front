import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'
import { Map, Overlay, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { transform } from 'ol/proj'
import OSM from 'ol/source/OSM'
import { useEffect, useRef, useState } from 'react'
import CitySearchInput from '../../CreateProfile/CitySearchInput'
import { Box } from '@chakra-ui/react'

type PropsMapInput = {
  onCoordinatesChange: (coordinates: [number, number]) => void
  defaultPositionMarker?: [number, number]
}

export default function MapInput({
  onCoordinatesChange,
  defaultPositionMarker,
}: Readonly<PropsMapInput>) {
  const mapRef = useRef<Map | null>(null)
  const markerRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('common')
  const ref = useRef<HTMLDivElement>(null)
  const [coordinates, setCoordinates] = useState<[number, number] | null>(
    defaultPositionMarker ?? null
  )

  useEffect(() => {
    if (ref.current && !mapRef.current) {
      mapRef.current = new Map({
        target: ref.current,
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

      const handleClicked = async (e) => {
        const coordinates = mapRef?.current?.getCoordinateFromPixel(e.pixel)

        if (!coordinates) return
        const transformedCoordinates = transform(
          coordinates,
          'EPSG:3857',
          'EPSG:4326'
        )

        onCoordinatesChange([
          transformedCoordinates[0] as number,
          transformedCoordinates[1] as number,
        ])

        if (markerRef.current) {
          const marker = new Overlay({
            position: coordinates,
            element: markerRef.current,
            positioning: 'bottom-center',
            stopEvent: false,
          })
          mapRef?.current?.addOverlay(marker)
        }
      }

      mapRef.current.on('click', handleClicked)
    }
  }, [ref, mapRef, t, onCoordinatesChange])

  useEffect(() => {
    if (mapRef.current && coordinates) {
      const transformedCoordinates = transform(
        coordinates,
        'EPSG:4326',
        'EPSG:3857'
      )
      if (markerRef.current) {
        const marker = new Overlay({
          position: transformedCoordinates,
          element: markerRef.current,
          positioning: 'bottom-center',
          stopEvent: false,
        })
        mapRef.current.addOverlay(marker)
        mapRef.current.getView().setCenter(transformedCoordinates)
        mapRef.current.getView().setZoom(6)
      }
    }
  }, [coordinates])

  const handleLocationSelected = (lat: string, lon: string) => {
    const coords: [number, number] = [parseFloat(lat), parseFloat(lon)]

    setCoordinates(coords)
    onCoordinatesChange(coords)
  }

  return (
    <Box position="relative" ref={ref} height={['200px', 'sm']} width={'100%'}>
      <CitySearchInput
        onLocationSelected={(lat, lon) => handleLocationSelected(lat, lon)}
      />
      <Box display={'none'}>
        <Box ref={markerRef}>
          <FontAwesomeIcon icon={faLocationDot} size="lg" />
        </Box>
      </Box>
    </Box>
  )
}
