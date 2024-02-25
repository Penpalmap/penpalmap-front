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
import TermsAndConditionsStep from './TermsAndConditionsStep'
import { ProfileBioForm } from './ProfileBioForm'
import Loading from '../Layout/loading'

const CreateProfile = () => {
  const { status, user, fetchUser } = useSession()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, watch } = useForm<ProfileFormData>({
    mode: 'onSubmit',
  })

  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: 6,
  })
  const toast = useToast()
  const selectedGender = watch('gender')
  const usersLanguages = watch('userLanguages')
  const watchForm = watch()
  const bio = watch('bio')
  const birthday = watch('birthday')

  const bioLength = useMemo(() => {
    if (bio) return bio.length
    return 0
  }, [bio])
  const [isUnderage, setIsUnderage] = useState(true)

  const disabledCondition = useMemo(() => {
    const isFormLanguageValid = () => {
      if (usersLanguages) {
        return usersLanguages.every(
          (language) => language.language !== '' && language.level !== ''
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
        return
      case 4:
        return !watchForm.latitude || !watchForm.longitude
      case 5:
        return bioLength <= 0 || bioLength > 200
      case 6:
        return !isFormLanguageValid()
      default:
        return false
    }
  }, [
    activeStep,
    usersLanguages,
    selectedGender,
    watchForm.birthday,
    watchForm.latitude,
    watchForm.longitude,
    isUnderage,
    bioLength,
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
          router.push('/home')
        }
      } else {
        router.push('/auth/signin')
      }
    }
    checkCreationProfile()
  }, [router, user, status])

  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.id) return
    setLoading(true)

    if (router.locale) data.languageUsed = router.locale

    data.isNewUser = false

    // verify language with all values
    if (data.userLanguages && data.userLanguages.length > 0) {
      data.userLanguages = data.userLanguages.filter(
        (language) => language.language && language.level
      )
    }

    const response = await updateUser(data, user.id)
    await fetchUser()
    if (response) {
      router.push('/home')
    }
    setLoading(false)
  }

  const renderActiveStep = useMemo(() => {
    toast.closeAll()

    switch (activeStep) {
      case 0:
        return <TermsAndConditionsStep />
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
        return <ProfileBioForm register={register} />
      case 6:
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
      {loading ? (
        <Loading />
      ) : (
        <LayoutCreationProfile
          activeStep={activeStep}
          handleNextStep={goToNext}
          handlePreviousStep={goToPrevious}
          disabled={disabledCondition}
          canBeSkipped={activeStep === 3 || activeStep === 5}
        >
          {renderActiveStep}
        </LayoutCreationProfile>
      )}
    </form>
  )
}

export default CreateProfile
