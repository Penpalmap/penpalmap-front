import React from 'react'
import { Text } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { useTranslation } from 'next-i18next'
import * as locales from 'date-fns/locale'

type LoggedInDateProps = {
    updatedAt: string // Assurez-vous de spécifier le bon type pour updatedAt
}

const LoggedInDate: React.FC<LoggedInDateProps> = ({ updatedAt }) => {
    const { t, i18n } = useTranslation('common')
    const userLanguage = i18n.language || 'en'
    const locale = locales[userLanguage] || locales['en']
    return (
        <Text>
            {t('profil.loggedIn')}{' '}
            {updatedAt
                ? formatDistanceToNow(new Date(updatedAt), {
                      locale,
                      addSuffix: true,
                  })
                : ''}
        </Text>
    )
}

export default LoggedInDate
