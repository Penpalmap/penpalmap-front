import { Box } from '@chakra-ui/react'
import 'ol/ol.css'
import useMap from '../../hooks/useMap'
import OverlayProfileMap from './OverlayProfileMap'
import { useCallback, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchAndZoom from './SearchAndZoom'

const Map = () => {
  const { mapContainerRef, mapObj, overlayRef } = useMap({
    center: [0, 0],
    zoom: 2,
  })

  const closeOverlay = useCallback(() => {
    if (mapObj.current && overlayRef) {
      overlayRef.setPosition(undefined)
    }
  }, [mapObj, overlayRef])

  return (
    <>
      <Box position="relative">
        <SearchAndZoom mapObj={mapObj} />
        <Box
          ref={mapContainerRef}
          h="calc(100vh - 4rem)"
          w="full"
          className="map"
          bg="#8CBBD4"
        />
      </Box>
      <Box display="none">
        <OverlayProfileMap closeOverlay={closeOverlay} />
      </Box>
    </>
  )
}

export default Map
