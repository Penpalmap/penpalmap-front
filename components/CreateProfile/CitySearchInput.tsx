import React, { useState } from 'react'
import { Box, Input, List, ListItem } from '@chakra-ui/react'

type Suggestion = {
    display_name: string
    lat: string
    lon: string
}

const CitySearchInput = () => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])

    const handleInputChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        //setInputValue(event.target.value)
        if (event.target.value.length > 2) {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${event.target.value}&format=json&limit=5`
            )
            const data: Suggestion[] = await response.json()
            setSuggestions(data)
            console.log(data)
        } else {
            setSuggestions([])
            console.log('trop court')
        }
    }

    const handleSuggestionClick = (suggestion: Suggestion) => {
        console.log(`Lat: ${suggestion.lat}, Lon: ${suggestion.lon}`)
    }

    return (
        <Box width="100%" maxW="400px">
            <Input
                type="text"
                placeholder="Entrez le nom de la ville"
                onChange={handleInputChange}
            />
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
