import React, { useRef, useState } from 'react'
import { Box, Input as ChakraInput, FormLabel } from '@chakra-ui/react'
import { UseFormRegister } from 'react-hook-form'

interface CustomInputProps extends Record<string, any> {
  name: string
  label?: string
  register: UseFormRegister<any>
  validationSchema?: any // Spécifiez un type plus détaillé si nécessaire
  // Ajoutez d'autres props que vous pourriez avoir besoin
}

const Input: React.FC<CustomInputProps> = ({
  name,
  label,
  register,
  validationSchema,
  ...props
}) => {
  const labelRef = useRef<HTMLLabelElement>(null)
  const [hasValue, setHasValue] = useState(false)

  const {
    ref,
    onBlur: hookFormOnBlur,
    onChange: hookFormOnChange,
    ...restRegisterProps
  } = register(name, validationSchema)

  const handleFocus = () => {
    // Votre logique de focus
    labelRef.current?.style.setProperty('top', '-30%')
    labelRef.current?.style.setProperty('color', '#3EB6A0')
    labelRef.current?.style.setProperty('font-weight', 'bold')
    labelRef.current?.style.setProperty('font-size', '12px')
    labelRef.current?.style.setProperty('left', '0')
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.trim().length > 0)
    if (!hasValue) {
      labelRef.current?.style.setProperty('top', '50%')
      labelRef.current?.style.setProperty('color', '#718096')
      labelRef.current?.style.setProperty('font-weight', 'normal')
      labelRef.current?.style.setProperty('font-size', '16px')
      labelRef.current?.style.setProperty('left', '1rem')
    }
    hookFormOnBlur(e)
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.trim().length > 0)
    hookFormOnChange(e)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <Box position="relative">
      <ChakraInput
        bg="white"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleCustomChange}
        ref={(e) => {
          ref(e)
        }}
        {...props}
        {...restRegisterProps}
      />
      {label && (
        <FormLabel
          ref={labelRef}
          position="absolute"
          top={hasValue ? '-30%' : '50%'}
          left={4}
          transform="translateY(-50%)"
          zIndex={1}
          color={hasValue ? '#3EB6A0' : 'gray.500'}
          transition="linear 0.2s all"
        >
          {label}
        </FormLabel>
      )}
    </Box>
  )
}

export default Input
