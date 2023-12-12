import { useSteps } from '@chakra-ui/react'
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

const CreateProfile = () => {
    // const { data: session, status, update: updateSession } = useSession()

    const { session, status, fetchUser } = useSession()
    const router = useRouter()

    const { register, handleSubmit, setValue, watch } =
        useForm<ProfileFormData>({
            mode: 'onSubmit',
        })

    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 0,
        count: 5,
    })
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
                return !selectedGender
            case 1:
                return !watchForm.birthday || isUnderage
            case 2:
                return false
            case 3:
                return !watchForm.latitude || !watchForm.longitude
            case 4:
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
        debugger
        if (!session?.user.id) return

        if (router.locale) data.languageUsed = router.locale

        data.isNewUser = false

        // verify language with all values
        if (data.userLanguages && data.userLanguages.length > 0) {
            data.userLanguages = data.userLanguages.filter(
                (language) => language.language && language.level
            )
        }

        const response = await updateUser(data, session?.user.id)

        if (response) {
            await fetchUser()
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
                return <ProfileImage images={[]} />
            case 3:
                return <ProfileLocationInput setValue={setValue} />
            case 4:
                return <ProfileLanguageForm setValue={setValue} />
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

// export async function getStaticProps({ locale }) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale)),
//         },
//     }
// }
