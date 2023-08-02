import axios from 'axios'
import { fromLonLat } from 'ol/proj'

export const getPositionDataByCoords = async (
    lat: number,
    lon: number
): Promise<any | null> => {
    // get data with nomitatim
    const coords = fromLonLat([lon, lat], 'EPSG:4326')
    const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords[0]}&lon=${coords[1]}`
    )
    const data = response.data

    if (data.error) return null

    return data
}

export const getFlagByCountryCode = async (
    countryCode
): Promise<string | null> => {
    return `https://flagsapi.com/${countryCode}/flat/64.png`
}
