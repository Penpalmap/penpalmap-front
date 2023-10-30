import { useSteps } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { ProfileFormData } from '../../types'
import { useForm } from 'react-hook-form'
import ProfileGenderInput from './ProfileGenderInput'
import ProfileBirthdayInput from './ProfileBirthdayInput'
import ProfilePhotoUpload from './ProfilePhotoUpload'
import ProfileLocationInput from './ProfileLocationInput'
import { useSession } from 'next-auth/react'
import { getUserById, updateUser } from '../../api/userApi'
import { useRouter } from 'next/router'
import LayoutCreationProfile from './LayoutCreationProfile'

const CreateProfile = () => {
    const { data: session, status, update: updateSession } = useSession()
    const router = useRouter()

    const { register, handleSubmit, setValue, watch } =
        useForm<ProfileFormData>({
            mode: 'onChange',
        })

    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 0,
        count: 4,
    })
    const selectedGender = watch('gender')
    const watchForm = watch()
    const [isUnderage, setIsUnderage] = useState(true)
    const disabledCondition = useMemo(() => {
        switch (activeStep) {
            case 0:
                return !selectedGender
            case 1:
                return !watchForm.birthday || isUnderage
            case 2:
                return false
            case 3:
                return !watchForm.latitude || !watchForm.longitude
            default:
                return false
        }
    }, [
        activeStep,
        selectedGender,
        watchForm.birthday,
        watchForm.latitude,
        watchForm.longitude,
        isUnderage,
    ])

    //check avec getUserById si l'utilisateur a déjà un profil
    //si oui, on redirige vers la page de profil
    //si non, on continue
    useEffect(() => {
        const checkCreationProfile = async () => {
            if (status === 'loading') return // Do nothing while loading
            if (session) {
                const user = await getUserById(session.user.id)
                if (user && user.isNewUser === false) {
                    //rediriger vers la page de profil
                    router.push('/')
                }
            } else {
                router.push('/auth/signin')
            }
        }
        checkCreationProfile()
    }, [router, session, status])

    const onSubmit = async (data: ProfileFormData) => {
        if (!session?.user.id) return
        await updateUser(
            {
                isNewUser: false,
            },
            session?.user.id
        )

        updateSession()

        const response = await updateUser(data, session?.user.id)

        if (response) {
            router.push('/')
        }
    }

    const renderActiveStep = useMemo(() => {
        switch (activeStep) {
            case 0:
                return (
                    <ProfileGenderInput
                        setValue={setValue}
                        selectedGender={selectedGender}
                    />
                )
            case 1:
                return (
                    <ProfileBirthdayInput
                        register={register}
                        setValue={setValue}
                        setIsUnderage={setIsUnderage}
                    />
                )
            case 2:
                return <ProfilePhotoUpload />
            case 3:
                return <ProfileLocationInput setValue={setValue} />
            default:
                return null
        }
    }, [activeStep, setValue, selectedGender, register])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                height: '100%',
                overflowX: 'hidden',
            }}
        >
            <LayoutCreationProfile
                activeStep={activeStep}
                handleNextStep={goToNext}
                handlePreviousStep={goToPrevious}
                disabled={disabledCondition}
            >
                {renderActiveStep}
            </LayoutCreationProfile>
        </form>
    )
}

export default CreateProfile
