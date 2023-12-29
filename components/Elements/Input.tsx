import { Box, Input as ChakraInput, FormLabel } from '@chakra-ui/react'
import { useRef } from 'react'

const Input = ({ placeholderText, ...props }) => {
    const labelRef = useRef<HTMLLabelElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const hasValue =
        inputRef.current?.value !== undefined &&
        inputRef?.current.value !== null

    const handleFocus = () => {
        labelRef.current?.style.setProperty('top', '-30%')
        labelRef.current?.style.setProperty('color', '#3EB6A0')
        labelRef.current?.style.setProperty('font-weight', 'bold')
        labelRef.current?.style.setProperty('font-size', '12px')
        labelRef.current?.style.setProperty('left', '0')
    }

    const handleBlur = () => {
        if (!hasValue) {
            labelRef.current?.style.setProperty('top', '50%')
            labelRef.current?.style.setProperty('color', '#718096')
            labelRef.current?.style.setProperty('font-weight', 'normal')
            labelRef.current?.style.setProperty('font-size', '16px')
            labelRef.current?.style.setProperty('left', '1rem')
        }
    }

    return (
        <Box position={'relative'} marginTop={2}>
            <ChakraInput
                {...props}
                bg={'white'}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
            />
            <FormLabel
                fontSize={'md'}
                position={'absolute'}
                top={hasValue ? '-30%' : '50%'}
                transform={'translateY(-50%)'}
                left={'4'}
                zIndex={1}
                ref={labelRef}
                color={hasValue ? '#3EB6A0' : 'gray.500'}
                transition={'linear 0.2s all'}
            >
                {placeholderText}
            </FormLabel>
        </Box>
    )
}

export default Input
