import axios from 'axios'

export const getCountryByCoords = async (
    lat: number,
    lon: number
): Promise<string | null> => {
    // get data with nomitatim
    const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    )
    const data = response.data

    if (data.error) return null
    // get country name
    const country = data.address.country
    return country
}
