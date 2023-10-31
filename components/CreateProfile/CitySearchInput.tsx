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
interface CitySearchInputProps {
    onLocationSelected: (lat: string, lon: string, displayName: string) => void
}

const CitySearchInput: React.FC<CitySearchInputProps> = ({
    onLocationSelected,
}) => {
    // const [queryValue, setQueryValue] = useState('') // Nouvel état pour la valeur à interroger
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [loading, setLoading] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const [inputValue, setInputValue] = useState('')

    // Cette ref gardera une trace de notre setTimeout pour que nous puissions l'annuler si nécessaire
    const timeoutRef = useRef<number | null>(null)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputValue(value)

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
        if (onLocationSelected) {
            onLocationSelected(
                suggestion.lat,
                suggestion.lon,
                suggestion.display_name
            )
        }
        setInputValue('')
        setSuggestions([]) // Ceci va vider la liste des suggestions après le clic
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setSuggestions([])
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <Box
            ref={ref}
            width="100%"
            position="relative"
            bg="white"
            borderRadius="md"
            boxShadow="md"
        >
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
                    value={inputValue}
                    placeholder="Search for a place or city..."
                    onChange={handleInputChange}
                    borderRadius="md"
                />
            </InputGroup>
            {suggestions.length > 0 && (
                <List
                    border="1px solid #ccc"
                    borderRadius="md"
                    mt="2"
                    position="absolute"
                    top="100%"
                    zIndex="1"
                    width="100%"
                    bg="white"
                    boxShadow="md"
                >
                    {suggestions.map((suggestion, index) => (
                        <ListItem
                            key={index}
                            p="2"
                            cursor="pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                            transition="background-color 0.2s"
                            _hover={{ bg: 'gray.200' }}
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
