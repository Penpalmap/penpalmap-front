import axios from 'axios'
import { fromLonLat } from 'ol/proj'

export const getPositionDataByCoords = async (
    lat: number,
    lon: number
): Promise<any | null> => {
    // get data with nomitatim
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        )

        const data = response.data

        return data
    } catch (error) {
        return null
    }
}

export const getFlagByCountryCode = async (
    countryCode
): Promise<string | null> => {
    return `https://flagsapi.com/${countryCode}/flat/64.png`
}
