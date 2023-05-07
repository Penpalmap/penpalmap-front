import React, { useEffect, useRef } from 'react'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Photo from 'ol-ext/style/Photo'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

const MapPage = () => {
    const mapRef = useRef(null)

    useEffect(() => {
        const map = new Map({
            target: mapRef.current,
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

        const pointStyle = new Photo({
            src: '/marker.png',
            radius: 10,
        })

        const pointFeature = new ol.Feature({
            geometry: new ol.geom.Point([0, 0]),
        })

        pointFeature.setStyle(pointStyle)

        const vectorLayer = new VectorLayer({
            source: new VectorSource({
                features: [pointFeature],
            }),
        })

        map.addLayer(vectorLayer)
    }, [])

    return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
}

export default MapPage
