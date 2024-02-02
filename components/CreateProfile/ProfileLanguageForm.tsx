import { Button, Flex, IconButton, Select, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { UserLanguage } from '../../types'
import { useSession } from './../../hooks/useSession'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'next-i18next'
import { faFlag } from '@fortawesome/free-solid-svg-icons'

type Props = {
  setValue: (name: 'userLanguages', value: UserLanguage[]) => void
}

const ProfileLanguageForm = ({ setValue }: Props) => {
  const { user } = useSession()
  const [languages, setLanguages] = useState<UserLanguage[]>([])

  useEffect(() => {
    if (user?.id) {
      setLanguages([{ language: '', level: '', userId: user.id }])
    }
  }, [user])

  const { t } = useTranslation('common')

  const availableLanguages = [
    {
      label: t('languages.en'),
      value: 'en',
    },
    {
      label: t('languages.fr'),
      value: 'fr',
    },
    {
      label: t('languages.es'),
      value: 'es',
    },
    {
      label: t('languages.de'),
      value: 'de',
    },
    {
      label: t('languages.pt'),
      value: 'pt',
    },
    {
      label: t('languages.it'),
      value: 'it',
    },
    {
      label: t('languages.ru'),
      value: 'ru',
    },
    {
      label: t('languages.ja'),
      value: 'ja',
    },
    {
      label: t('languages.zh'),
      value: 'zh',
    },
    {
      label: t('languages.ar'),
      value: 'ar',
    },
    {
      label: t('languages.hi'),
      value: 'hi',
    },
    {
      label: t('languages.tr'),
      value: 'tr',
    },
    {
      label: t('languages.ko'),
      value: 'ko',
    },
    {
      label: t('languages.pl'),
      value: 'pl',
    },
    {
      label: t('languages.nl'),
      value: 'nl',
    },
    {
      label: t('languages.id'),
      value: 'id',
    },
    {
      label: t('languages.sw'),
      value: 'sw',
    },
    {
      label: t('languages.yo'),
      value: 'yo',
    },
    {
      label: t('languages.ig'),
      value: 'ig',
    },
    {
      label: t('languages.am'),
      value: 'am',
    },
    {
      label: t('languages.tl'),
      value: 'tl',
    },
    {
      label: t('languages.vi'),
      value: 'vi',
    },
    {
      label: t('languages.th'),
      value: 'th',
    },
    {
      label: t('languages.ms'),
      value: 'ms',
    },
    {
      label: t('languages.ta'),
      value: 'ta',
    },
    {
      label: t('languages.te'),
      value: 'te',
    },
    {
      label: t('languages.kn'),
      value: 'kn',
    },
    {
      label: t('languages.he'),
      value: 'he',
    },
    {
      label: t('languages.fa'),
      value: 'fa',
    },
    {
      label: t('languages.hu'),
      value: 'hu',
    },
    {
      label: t('languages.fi'),
      value: 'fi',
    },
    {
      label: t('languages.et'),
      value: 'et',
    },
    {
      label: t('languages.bn'),
      value: 'bn',
    },
    {
      label: t('languages.el'),
      value: 'el',
    },
    {
      label: t('languages.sv'),
      value: 'sv',
    },
    {
      label: t('languages.no'),
      value: 'no',
    },
    {
      label: t('languages.da'),
      value: 'da',
    },
    {
      label: t('languages.cs'),
      value: 'cs',
    },
    {
      label: t('languages.sk'),
      value: 'sk',
    },
    {
      label: t('languages.sl'),
      value: 'sl',
    },
    {
      label: t('languages.hr'),
      value: 'hr',
    },
    {
      label: t('languages.bg'),
      value: 'bg',
    },
    {
      label: t('languages.ro'),
      value: 'ro',
    },
    {
      label: t('languages.sr'),
      value: 'sr',
    },
    {
      label: t('languages.ka'),
      value: 'ka',
    },
  ]

  const addLanguage = () => {
    if (!user?.id) return

    const newLanguage: UserLanguage = {
      language: '',
      level: '',
      userId: user.id,
    }
    setLanguages([...languages, newLanguage])
    setValue('userLanguages', [...languages, newLanguage])
  }

  const handleLanguageChange = (index: number, value: string) => {
    const updatedLanguages = [...languages]

    const languageToUpdate = updatedLanguages[index]

    if (!languageToUpdate) return

    languageToUpdate.language = value

    setLanguages(updatedLanguages)

    setValue('userLanguages', updatedLanguages)
  }

  const handleLevelChange = (index: number, value: string) => {
    const updatedLanguages = [...languages]

    const languageToUpdate = updatedLanguages[index]

    if (!languageToUpdate) return

    languageToUpdate.level = value

    setLanguages(updatedLanguages)
    setValue('userLanguages', updatedLanguages)
  }

  return (
    <VStack spacing={4} alignItems={'flex-start'}>
      {languages.map((language, index) => (
        <Flex key={language.id} gap={4} alignItems="center">
          <FontAwesomeIcon icon={faFlag} />
          <Select
            placeholder={t('connect.selectALanguage')}
            value={language.language}
            onChange={(e) => handleLanguageChange(index, e.target.value)}
          >
            {availableLanguages.map((language) => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </Select>
          <Select
            placeholder={t('connect.level')}
            value={language.level}
            onChange={(e) => handleLevelChange(index, e.target.value)}
          >
            <option value="native">{t('connect.native')}</option>
            <option value="fluent">{t('connect.fluent')}</option>
            <option value="advanced">{t('connect.advanced')}</option>
            <option value="intermediate">{t('connect.intermediate')}</option>
            <option value="beginner">{t('connect.beginner')}</option>
          </Select>

          <IconButton
            aria-label={t('connect.delete')}
            icon={<FontAwesomeIcon icon={faTrash} />}
            onClick={() => {
              const updatedLanguages = [...languages]
              updatedLanguages.splice(index, 1)
              setLanguages(updatedLanguages)
              setValue('userLanguages', updatedLanguages)
            }}
          />
        </Flex>
      ))}
      <Button onClick={addLanguage}>{t('connect.addLanguage')}</Button>
    </VStack>
  )
}

export default ProfileLanguageForm
