import { useSteps, useToast } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { ProfileFormData } from '../../types'
import { useForm } from 'react-hook-form'
import ProfileGenderInput from './ProfileGenderInput'
import ProfileBirthdayInput from './ProfileBirthdayInput'
import ProfileLocationInput from './ProfileLocationInput'
import { useSession } from './../../hooks/useSession'
import { getUserById, updateUser } from '../../api/userApi'
import { useRouter } from 'next/router'
import LayoutCreationProfile from './LayoutCreationProfile'
import ProfileImage from '../Profile/ProfileImages'
import ProfileLanguageForm from './ProfileLanguageForm'
import { fas } from '@fortawesome/free-solid-svg-icons'
import TermsAndConditionsStep from './TermsAndConditionsStep'

const CreateProfile = () => {
    // const { data: session, status, update: updateSession } = useSession()

    const { status, user, fetchUser } = useSession()
    const router = useRouter()

    const { register, handleSubmit, setValue, watch } =
        useForm<ProfileFormData>({
            mode: 'onSubmit',
        })

    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 0,
        count: 5,
    })
    const toast = useToast()
    const selectedGender = watch('gender')
    const usersLanguages = watch('userLanguages')
    const watchForm = watch()

    const [isUnderage, setIsUnderage] = useState(true)

    const disabledCondition = useMemo(() => {
        const isFormLanguageValid = () => {
            if (usersLanguages) {
                // if (usersLanguages.length === 1 && usersLanguages[0]) {
                //     return usersLanguages[0].language !== '' && usersLanguages[0].level !== '';
                // }
                return usersLanguages.every(
                    (language) =>
                        language.language !== '' && language.level !== ''
                )
            }
            return false
        }

        switch (activeStep) {
            case 0:
                return false
            case 1:
                return !selectedGender
            case 2:
                return !watchForm.birthday || isUnderage
            case 3:
                return false
            case 4:
                return !watchForm.latitude || !watchForm.longitude
            case 5:
                return !isFormLanguageValid()
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
        usersLanguages,
    ])

    //check avec getUserById si l'utilisateur a déjà un profil
    //si oui, on redirige vers la page de profil
    //si non, on continue
    useEffect(() => {
        const checkCreationProfile = async () => {
            if (status === 'loading') return // Do nothing while loading
            if (user) {
                const userById = await getUserById(user.id)
                if (userById && userById.isNewUser === false) {
                    //rediriger vers la page de profil
                    router.push('/')
                }
            } else {
                router.push('/auth/signin')
            }
        }
        checkCreationProfile()
    }, [router, user, status])

    const onSubmit = async (data: ProfileFormData) => {
        if (!user || !user.id) return

        if (router.locale) data.languageUsed = router.locale

        data.isNewUser = false

        // verify language with all values
        if (data.userLanguages && data.userLanguages.length > 0) {
            data.userLanguages = data.userLanguages.filter(
                (language) => language.language && language.level
            )
        }

        const response = await updateUser(data, user.id)
        fetchUser()
        if (response) {
            router.push('/')
        }
    }

    const renderActiveStep = useMemo(() => {
        toast.closeAll()

        switch (activeStep) {
            case 0:
                return <TermsAndConditionsStep handleAcceptTerms={goToNext} />
            case 1:
                return (
                    <ProfileGenderInput
                        setValue={setValue}
                        selectedGender={selectedGender}
                    />
                )
            case 2:
                return (
                    <ProfileBirthdayInput
                        register={register}
                        setValue={setValue}
                        setIsUnderage={setIsUnderage}
                    />
                )
            case 3:
                return <ProfileImage images={[]} />
            case 4:
                return <ProfileLocationInput setValue={setValue} />
            case 5:
                return <ProfileLanguageForm setValue={setValue} />
            default:
                return null
        }
    }, [toast, activeStep, setValue, selectedGender, register])

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

// export async function getStaticProps({ locale }) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale)),
//         },
//     }
// }
