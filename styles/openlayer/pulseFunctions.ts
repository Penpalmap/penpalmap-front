import { easeOut } from 'framer-motion'
import { Feature } from 'ol'
import { unByKey } from 'ol/Observable'
import VectorLayer from 'ol/layer/Vector'
import { getVectorContext } from 'ol/render'
import Cluster from 'ol/source/Cluster'
import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Style from 'ol/style/Style'
import OLMap from 'ol/Map'
import { Geometry } from 'ol/geom'
import VectorSource from 'ol/source/Vector'

export function pulse(
    feature: Feature,
    userLayer: VectorLayer<VectorSource<Geometry>>,
    mapObj: OLMap | null,
    duration = 3500
) {
    const animate = (event) => {
        const frameState = event.frameState
        const elapsed = frameState.time - start
        if (elapsed >= duration) {
            unByKey(listenerKey)
            return
        }
        const vectorContext = getVectorContext(event)
        const elapsedRatio = elapsed / duration
        const radius = easeOut(elapsedRatio) * 42 + 5
        const opacity = easeOut(1 - elapsedRatio)

        const style = new Style({
            image: new CircleStyle({
                radius: radius,
                fill: new Fill({
                    color: 'rgba(62, 182, 160,' + opacity + ')',
                }),
                displacement: [-2, 2],
            }),
        })

        vectorContext.setStyle(style)
        vectorContext.drawGeometry(flashGeom as Geometry)
        // tell OpenLayers to continue postrender animation
        mapObj?.render() // Utilisation sécurisée de mapObj
    }

    const start = Date.now()
    const flashGeom = feature?.getGeometry()?.clone()
    const listenerKey = userLayer.on('prerender', animate)
}
