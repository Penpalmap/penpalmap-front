import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Photo from './../openlayer/Photo'
import { UserElement } from '../../types'
import Fill from 'ol/style/Fill'
import CircleStyle from 'ol/style/Circle'
import Text from 'ol/style/Text'
import Icon from 'ol/style/Icon'

export const styleCache = {}

const clusterStyle = function (feature) {
  const features = feature.get('features')
  if (!features) {
    // Si ce n'est pas un cluster, traiter la feature normalement
    // Ici, vous devez retourner un style approprié pour une feature individuelle
    const userElement = feature.get('element')

    const genderFolder =
      userElement?.gender === 'man' || userElement?.gender === 'woman'
        ? userElement?.gender
        : 'other'
    console.log('featureMaxUser', userElement)

    // if (!style) {
    return [
      new Style({
        image: new Photo({
          src:
            userElement.image ||
            `/images/avatar/${genderFolder}/${userElement.avatarNumber}.png`,
          radius: 30,
          crop: true,
          kind: 'circle',
          shadow: 5,
          stroke: new Stroke({
            color: userElement.strokeColor,
            width: 2,
          }),
        }),
      }),
    ]
  }

  const size = feature.get('features').length

  // ... Reste de votre logique pour les clusters
  // Cluster de plusieurs personnes
  if (size > 1) {
    let featureMaxUser: UserElement | null = null
    let max = null
    for (let I = 0; I < size; I++) {
      if (
        max === null ||
        feature.get('features')[I].get('element').points > max
      ) {
        max = feature.get('features')[I].get('element').points
        featureMaxUser = feature.get('features')[I].get('element')
      }
    }

    if (!featureMaxUser) {
      return null
    }
    const uid = featureMaxUser?.id
    if (!uid) {
      return null
    }

    let style = styleCache[uid]
    console.log('featureMaxUser', featureMaxUser)
    const genderFolder =
      featureMaxUser?.gender === 'man' || featureMaxUser?.gender === 'woman'
        ? featureMaxUser?.gender
        : 'other'

    // if (!style) {
    const photo = featureMaxUser?.image
    style = styleCache[uid] = [
      new Style({
        image: new Photo({
          src: photo
            ? photo
            : `/images/avatar/${genderFolder}/${featureMaxUser?.avatarNumber}.png`,
          radius: 30,
          crop: true,
          kind: 'circle',
          shadow: 5,
          stroke: new Stroke({
            color: featureMaxUser?.strokeColor,
            width: 2,
          }),
        }),
      }),
      // Pas de message non lu
      featureMaxUser.room &&
      featureMaxUser.room.countUnreadMessages &&
      parseInt(featureMaxUser.room.countUnreadMessages) === 0
        ? new Style({
            image: new Icon({
              src: '/images/conversation_icon.png',
              displacement: [20, 26],
              scale: 0.8,
            }),
          })
        : new Style({}),

      // Message non lu
      featureMaxUser.room &&
      featureMaxUser.room.countUnreadMessages &&
      parseInt(featureMaxUser.room.countUnreadMessages) > 0
        ? new Style({
            image: new CircleStyle({
              radius: 9,
              fill: new Fill({
                color: '#FF0808',
              }),
              displacement: [20, 26],
              stroke: new Stroke({
                color: '#fff',
                width: 2,
              }),
            }),
            text: new Text({
              text: featureMaxUser.room.countUnreadMessages,
              fill: new Fill({
                color: '#fff',
              }),
              font: 'bold 10px Montserrat',

              offsetX: 20.5,
              offsetY: -26,
            }),
          })
        : new Style({}),
      // Utilisateur en ligne
      featureMaxUser.isOnline
        ? new Style({
            image: new CircleStyle({
              radius: 6,
              fill: new Fill({
                color: '#38A169',
              }),
              displacement: [20, -20],
              stroke: new Stroke({
                color: '#fff',
                width: 2,
              }),
            }),
          })
        : new Style({
            image: new CircleStyle({
              radius: 6,
              fill: new Fill({
                color: '#E2E8F0',
              }),
              displacement: [20, -20],
              stroke: new Stroke({
                color: '#fff',
                width: 2,
              }),
            }),
          }),
    ]
    return style
  }

  // Cluster d'une seule personne
  else {
    if (!feature.get('features')[0]) {
      return null
    }
    const user: UserElement = feature.get('features')[0].get('element')
    const uid = user.id
    if (!uid) {
      return null
    }
    let style = styleCache[uid]
    const genderFolder =
      user?.gender === 'man' || user?.gender === 'woman'
        ? user?.gender
        : 'other'

    // if (!style) {
    const photo = user.image

    style = styleCache[uid] = [
      new Style({
        image: new Photo({
          src: photo
            ? photo
            : `/images/avatar/${genderFolder}/${user?.avatarNumber}.png`,
          radius: 30,
          crop: true,
          kind: 'circle',
          shadow: 5,
          stroke: new Stroke({
            color: user.strokeColor,
            width: 2,
          }),
        }),
      }),

      // Pas de message non lu
      user.room &&
      user.room.countUnreadMessages &&
      parseInt(user.room.countUnreadMessages) === 0
        ? new Style({
            image: new Icon({
              src: '/images/conversation_icon.png',
              displacement: [20, 26],
              scale: 0.8,
            }),
          })
        : new Style({}),

      // Message non lu
      user.room &&
      user.room.countUnreadMessages &&
      parseInt(user.room.countUnreadMessages) > 0
        ? new Style({
            image: new CircleStyle({
              radius: 9,
              fill: new Fill({
                color: '#FF0808',
              }),
              displacement: [20, 26],
              stroke: new Stroke({
                color: '#fff',
                width: 2,
              }),
            }),
            text: new Text({
              text: user.room.countUnreadMessages,
              fill: new Fill({
                color: '#fff',
              }),
              font: 'bold 10px Montserrat',

              offsetX: 20.5,
              offsetY: -26,
            }),
          })
        : new Style({}),

      // Utilisateur en ligne
      user.isOnline
        ? new Style({
            image: new CircleStyle({
              radius: 6,
              fill: new Fill({
                color: '#38A169',
              }),
              displacement: [20, -20],
              stroke: new Stroke({
                color: '#fff',
                width: 2,
              }),
            }),
          })
        : new Style({
            image: new CircleStyle({
              radius: 6,
              fill: new Fill({
                color: '#E2E8F0',
              }),
              displacement: [20, -20],
              stroke: new Stroke({
                color: '#fff',
                width: 2,
              }),
            }),
          }),
    ]
    // }
    return style
  }
}

export default clusterStyle
