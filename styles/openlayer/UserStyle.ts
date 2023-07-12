import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Photo from './../openlayer/Photo'
import { User } from '../../types'

export const userStyleCache = {}

const userStyle = function (feature) {
    console.log(feature)
    const user: User = feature.values_.element
    const uid = user.id

    let style: Style = userStyleCache[uid]

    if (!style) {
        const photo = user.image

        style = userStyleCache[uid] = new Style({
            image: new Photo({
                src: photo
                    ? photo
                    : 'https://t4.ftcdn.net/jpg/02/89/59/55/360_F_289595573_wCKO1nxxx7HGk69z5szjvSOqPnZVTfTG.jpg',
                radius: 30,
                crop: true,
                kind: 'circle',
                shadow: 5,
                stroke: new Stroke({
                    color: user.strokeColor,
                    width: 3,
                }),
            }),
        })
    }

    return style
}

export default userStyle
