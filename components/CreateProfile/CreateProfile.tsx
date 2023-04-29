import { Box, Button } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { ProfileFormData } from '../../types'
import { useForm } from 'react-hook-form'
import ProfileGenderInput from './ProfileGenderInput'
import ProfileBirthdayInput from './ProfileBirthdayInput'
import ProfilePhotoUpload from './ProfilePhotoUpload'
import ProfileLocationInput from './ProfileLocationInput'
import { useSession } from 'next-auth/react'
import { getUserById } from '../../api/userApi'
import { useRouter } from 'next/router'

const CreateProfile = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    const { register, handleSubmit, setValue } = useForm<ProfileFormData>({
        mode: 'onChange',
    })

    //check avec getUserById si l'utilisateur a déjà un profil
    //si oui, on redirige vers la page de profil
    //si non, on continue
    useEffect(() => {
        const checkCreationProfile = async () => {
            if (status === 'loading') return // Do nothing while loading

            if (session) {
                const user = await getUserById(session.user.userId)
                if (user && user.profile_completed) {
                    //rediriger vers la page de profil
                    router.push('/')
                }
            } else {
                router.push('/auth/signin')
            }
        }
        checkCreationProfile()
    }, [session])

    const [step, setStep] = useState(1)

    const handleNextStep = useCallback(() => {
        setStep(step + 1)
    }, [step])

    const handlePreviousStep = () => {
        setStep(step - 1)
    }

    const onSubmit = (data: ProfileFormData) => {
        console.log(data) // Ici vous pouvez envoyer les données du formulaire vers votre serveur
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return <ProfileGenderInput />
            case 2:
                return <ProfileBirthdayInput />
            case 3:
                return <ProfilePhotoUpload />
            case 4:
                return <ProfileLocationInput />
            default:
                return null
        }
    }

    return (
        <Box>
            <h1>create profile</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {renderStep()}
                {step !== 1 && (
                    <Button type="button" onClick={handlePreviousStep}>
                        Précédent
                    </Button>
                )}

                {step}
                {step !== 4 && (
                    <Button onClick={handleNextStep}>Suivant</Button>
                )}
                {step === 4 && <Button type="submit">Terminer</Button>}
            </form>
        </Box>
    )
}

export default CreateProfile
