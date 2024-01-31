import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Photo from './../openlayer/Photo'
import { UserElement } from '../../types'

export const userStyleCache = {}

const userStyle = function (feature) {
  const user: UserElement = feature.values_.element
  const uid = user.id

  let style: Style = userStyleCache[uid]

  if (!style) {
    const imageUrl =
      user?.image ?? `/images/avatar/${user.gender}/${user?.avatarNumber}.png`

    const photo = user.image

    style = userStyleCache[uid] = new Style({
      image: new Photo({
        src: photo ? photo : imageUrl,
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
