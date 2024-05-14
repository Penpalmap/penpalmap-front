import { Box } from '@chakra-ui/react'
import 'ol/ol.css'
import useMap from '../../hooks/useMap'
import OverlayProfileMap from './OverlayProfileMap'
import { useCallback } from 'react'
import SearchAndZoom from './SearchAndZoom'
import { useMobileView } from '../../context/MobileViewContext'

const Map = () => {
  const { isMobile } = useMobileView()
  const { mapContainerRef, mapObj, overlayRef } = useMap()

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
          h={!isMobile ? 'calc(100vh - 4rem)' : 'calc(100vh - 7rem)'}
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
