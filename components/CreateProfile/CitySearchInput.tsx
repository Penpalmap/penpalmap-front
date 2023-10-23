/* eslint-disable react/no-children-prop */
import React, { useEffect, useRef, useState } from 'react'
import {
    Box,
    Input,
    List,
    ListItem,
    InputGroup,
    InputLeftElement,
    Spinner,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

type Suggestion = {
    display_name: string
    lat: string
    lon: string
}

const CitySearchInput = () => {
    const [queryValue, setQueryValue] = useState('') // Nouvel état pour la valeur à interroger
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [loading, setLoading] = useState(false)

    // Cette ref gardera une trace de notre setTimeout pour que nous puissions l'annuler si nécessaire
    const timeoutRef = useRef<number | null>(null)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        setLoading(true)

        timeoutRef.current = setTimeout(async () => {
            try {
                if (value.length > 2) {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?q=${value}&format=json&limit=5`
                    )
                    const data: Suggestion[] = await response.json()
                    setSuggestions(data)
                } else {
                    setSuggestions([])
                }
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des données:',
                    error
                )
            } finally {
                setLoading(false)
            }
        }, 500) as unknown as number
    }

    const handleSuggestionClick = (suggestion: Suggestion) => {
        console.log(`Lat: ${suggestion.lat}, Lon: ${suggestion.lon}`)
    }

    return (
        <Box width="100%" maxW="400px">
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={
                        loading ? (
                            <Spinner size="sm" />
                        ) : (
                            <SearchIcon boxSize={5} />
                        )
                    }
                />
                <Input
                    type="text"
                    placeholder="Entrez le nom de la ville"
                    onChange={handleInputChange}
                />
            </InputGroup>
            {suggestions.length > 0 && (
                <List mt="2" border="1px solid #ccc" borderRadius="md">
                    {suggestions.map((suggestion, index) => (
                        <ListItem
                            key={index}
                            p="2"
                            cursor="pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.display_name}
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    )
}

export default CitySearchInput
