import { Box } from '@chakra-ui/react'
import 'ol/ol.css'
import useMap from '../../hooks/useMap'
import OverlayProfileMap from './OverlayProfileMap'
import { useCallback, useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Map = () => {
    const { mapContainerRef, mapObj, overlayRef } = useMap({
        center: [0, 0],
        zoom: 2,
    })

    const [data, setData] = useContext(AppContext)

    const closeOverlay = useCallback(() => {
        if (!mapObj.current || !overlayRef) return
        overlayRef.setPosition(undefined)
    }, [mapObj, overlayRef])

    return (
        <>
            <Box
                ref={mapContainerRef}
                h={'full'}
                w={'full'}
                className="map"
            ></Box>
            <Box display={'none'}>
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
