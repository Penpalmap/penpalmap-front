import { Box } from '@chakra-ui/react'
import 'ol/ol.css'
import * as ol from 'ol'
import { fromLonLat } from 'ol/proj'
import useMap from '../../hooks/useMap'
import OverlayProfileMap from './OverlayProfileMap'
import { useCallback, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import CitySearchInput from '../CreateProfile/CitySearchInput'

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

    const handleLocationSelected = (lat, lon, displayName) => {
        if (!mapObj.current) return

        const view = mapObj.current.getView()
        const currentCenter = view.getCenter() as [number, number] | undefined
        const currentZoom = view.getZoom()

        if (!currentCenter || currentZoom === undefined) return

        const numericLat = parseFloat(lat)
        const numericLon = parseFloat(lon)
        const destination = fromLonLat([numericLon, numericLat])

        const distance = Math.sqrt(
            Math.pow(currentCenter[0] - destination[0], 2) +
                Math.pow(currentCenter[1] - destination[1], 2)
        )

        const intermediateZoom =
            distance < 1000000
                ? currentZoom
                : distance < 6000000
                ? currentZoom - 1
                : currentZoom - 4

        view.animate(
            { zoom: intermediateZoom, duration: 700 },
            { center: destination, duration: 1000 },
            { zoom: 10, duration: 700 }
        )
    }

    return (
        <>
            <CitySearchInput onLocationSelected={handleLocationSelected} />
            <Box
                ref={mapContainerRef}
                h="calc(100vh - 56px)"
                w="full"
                className="map"
                bg="#8CBBD4"
            />
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
