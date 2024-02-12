import { Box, Button, Stack } from '@chakra-ui/react'

interface FormNavigationLayoutProps {
  onPrevious?: () => void
  onNext: () => void
  onSubmit?: () => void
  isLastStep: boolean
  children: React.ReactNode
}

const FormNavigationLayout = ({
  onPrevious,
  onNext,
  onSubmit,
  isLastStep,
  children,
}: FormNavigationLayoutProps) => {
  return (
    <Box>
      {children}
      <Stack direction="row" spacing={4} justifyContent="space-between" mt={4}>
        {onPrevious && <Button onClick={onPrevious}>Retour</Button>}

        {isLastStep ? (
          <Button onClick={onSubmit}>Terminer</Button>
        ) : (
          <Button onClick={onNext}>Suivant</Button>
        )}
      </Stack>
    </Box>
  )
}

export default FormNavigationLayout
