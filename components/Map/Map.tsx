import { Box } from '@chakra-ui/react'
import 'ol/ol.css'
import * as ol from 'ol'
import useMap from '../../hooks/useMap'
import OverlayProfileMap from './OverlayProfileMap'
import { useCallback, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchAndZoom from './SearchAndZoom'

type MapRefObject = {
    current: ol.Map | null
}

const Map = () => {
    const { mapContainerRef, mapObj, overlayRef } = useMap({
        center: [0, 0],
        zoom: 2,
    }) as {
        mapContainerRef: React.RefObject<HTMLDivElement>
        mapObj: MapRefObject
        overlayRef: any
    }

    const [data, setData] = useContext(AppContext)

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
                    h="calc(100vh - 56px)"
                    w="full"
                    className="map"
                    bg="#8CBBD4"
                />
            </Box>
            <Box display="none">
                <OverlayProfileMap
                    user={data.userTarget}
                    closeOverlay={closeOverlay}
                    onOpenChat={() =>
                        setData({
                            ...data,
                            chatOpen: true,
                            userChat: data.userTarget,
                        })
                    }
                />
            </Box>
        </>
    )
}

export default Map
