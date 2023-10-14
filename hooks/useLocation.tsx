import { useState, useEffect } from 'react'
import {
    getFlagByCountryCode,
    getPositionDataByCoords,
} from '../utils/location'

const useLocation = (latitude, longitude) => {
    const [country, setCountry] = useState<string | null>(null)
    const [city, setCity] = useState<string | null>(null)
    const [countryCode, setCountryCode] = useState<string | null>(null)
    const [flag, setFlag] = useState<string | null>(null)

    useEffect(() => {
        const getData = async () => {
            const dataCoords = await getPositionDataByCoords(
                latitude,
                longitude
            )

            if (!dataCoords) return
            const countryCode = dataCoords.address.country_code.toUpperCase()
            const flag = await getFlagByCountryCode(countryCode)

            setFlag(flag)
            setCountry(dataCoords?.address?.country)
            setCity(dataCoords?.address?.municipality)
            setCountryCode(dataCoords?.address?.country_code)
        }

        if (latitude && longitude) {
            getData()
        }
    }, [latitude, longitude])

    return { country, city, flag, countryCode }
}

export default useLocation
