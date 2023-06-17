import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Photo from './../openlayer/Photo'
import { User } from '../../types'

export const styleCache = {}

const clusterStyle = function (feature) {
    const size = feature.get('features').length
    // Cluster de plusieurs personnes
    if (size > 1) {
        let featureMaxUser: User | null = null
        let max = null
        for (let I = 0; I < size; I++) {
            // A FIX : Point == null
            if (
                parseInt(feature.get('features')[I].get('element').points) ===
                    0 ||
                feature.get('features')[I].get('element').points > max
            ) {
                max = feature.get('features')[I].get('element').points
                featureMaxUser = feature.get('features')[I].get('element')
            }
        }

        const uid = featureMaxUser?.id
        let style = styleCache[uid]

        if (!style) {
            const photo = featureMaxUser?.image
            style = styleCache[uid] = new Style({
                image: new Photo({
                    src: photo
                        ? photo
                        : 'https://t4.ftcdn.net/jpg/02/89/59/55/360_F_289595573_wCKO1nxxx7HGk69z5szjvSOqPnZVTfTG.jpg',
                    radius: 30,
                    crop: true,
                    kind: 'circle',
                    shadow: 10,
                    stroke: new Stroke({
                        color: 'white',
                        width: 3,
                    }),
                }),
            })
        }
        return style
    }

    // Cluster d'une seule personne
    else {
        const user = feature.get('features')[0].get('element')
        const uid = user.user_id
        let style = styleCache[uid]

        if (!style) {
            const photo = user.img_small

            style = styleCache[uid] = new Style({
                image: new Photo({
                    src: photo
                        ? photo
                        : 'https://t4.ftcdn.net/jpg/02/89/59/55/360_F_289595573_wCKO1nxxx7HGk69z5szjvSOqPnZVTfTG.jpg',
                    radius: 30,
                    crop: true,
                    kind: 'circle',
                    shadow: 10,
                    stroke: new Stroke({
                        color: 'white',
                        width: 3,
                    }),
                }),
            })
        }
        return style
    }
}

export default clusterStyle
