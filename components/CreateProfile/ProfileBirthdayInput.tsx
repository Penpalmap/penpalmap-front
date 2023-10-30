import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { Box, FormControl, Select } from '@chakra-ui/react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { ProfileFormData } from '../../types'

type Props = {
    register: UseFormRegister<ProfileFormData>
    setValue: UseFormSetValue<ProfileFormData>
    setIsUnderage: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileBirthdayInput: React.FC<Props> = ({
    register,
    setValue,
    setIsUnderage,
}) => {
    const [day, setDay] = useState<number | null>(null)
    const [month, setMonth] = useState<number | null>(null)
    const [year, setYear] = useState<number | null>(null)

    const calculateAge = (birthdate: string): number => {
        const now = dayjs()
        const dob = dayjs(birthdate)
        const age = now.year() - dob.year() - (dob.isAfter(now, 'day') ? 1 : 0)
        return age
    }

    useEffect(() => {
        if (day && month && year) {
            const birthday = dayjs(`${year}-${month}-${day}`).format(
                'YYYY-MM-DD'
            )
            setValue('birthday', birthday)

            const age = calculateAge(birthday)
            const underage = age < 12

            setIsUnderage(underage)
        }
    }, [day, month, year, setValue, setIsUnderage])

    return (
        <FormControl id="birthday">
            <Box display="flex" gap="4">
                <Select
                    placeholder="Jour"
                    onChange={(e) => setDay(Number(e.target.value))}
                >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </Select>

                <Select
                    placeholder="Mois"
                    onChange={(e) => setMonth(Number(e.target.value))}
                >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        )
                    )}
                </Select>

                <Select
                    placeholder="Année"
                    onChange={(e) => setYear(Number(e.target.value))}
                >
                    {Array.from(
                        { length: 120 },
                        (_, i) => new Date().getFullYear() - i
                    ).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </Select>

                {/* Ceci reste caché mais maintient la structure de données actuelle */}
                <input type="date" {...register('birthday')} hidden />
            </Box>
        </FormControl>
    )
}

export default ProfileBirthdayInput
