import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import { Feature, Map as OLMap } from 'ol'
import { getUsersInMap } from '../api/userApi'
import VectorSource from 'ol/source/Vector'
import Cluster from 'ol/source/Cluster'
import VectorLayer from 'ol/layer/Vector'
import { Point } from 'ol/geom'
import clusterStyle from '../styles/openlayer/ClusterStyle'
import { AppContext } from '../context/AppContext'
import { useSession } from 'next-auth/react'
import { User } from '../types'

interface UseMapOptions {
    center: [number, number]
    zoom: number
}

interface UseMapConnexionResult {
    mapObj: React.RefObject<OLMap>
    mapContainerRef: React.RefObject<HTMLDivElement>
}

const useMapConnexion = ({}: UseMapOptions): UseMapConnexionResult => {
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapObj = useRef<OLMap>(null)

    // Initialize the map
    useEffect(() => {
        if (!mapContainerRef.current) return null

        const map = new OLMap({
            target: mapContainerRef.current,
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

        return () => {
            map.setTarget(undefined)
        }
    }, [])

    return { mapObj, mapContainerRef }
}

export default useMapConnexion
