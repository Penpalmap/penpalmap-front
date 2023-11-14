import { Box, Flex, Text, Image, Highlight } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const Presentation = () => {
    const { t } = useTranslation('common')

    return (
        <Box p={[15, 5]}>
            <Text
                py={2}
                fontSize={['xl', '3xl']}
                fontWeight="bold"
                textAlign="center"
                w={'full'}
                m={'auto'}
                fontStyle="italic"
            >
                {t('presentation.devise1')}
                <br />
                {t('presentation.devise2')}
            </Text>

            <Flex
                py={12}
                w={'full'}
                gap={'10'}
                alignItems={'center'}
                flexDir={['column', 'row']}
            >
                <Box flex={1}>
                    <Image
                        src="/images/image_landing2.png"
                        alt="PenPalMap"
                        width={'100%'}
                        borderRadius={'lg'}
                    />
                </Box>
                <Box flex={1} fontWeight={'medium'} fontSize={['sm', 'lg']}>
                    <Text fontWeight="bold">
                        Connectez-vous avec des amis du monde entier, où que
                        vous soyez. Faites des amis, apprenez des langues et
                        découvrez de nouvelles cultures quelque soit ta
                        position.
                    </Text>
                    <br></br>
                    <Text fontStyle="italic">
                        PenPalMap est une application de messagerie instantanée
                        qui permet de discuter avec des personnes du monde
                        entier. Que tu sois en voyage, en déplacement ou chez
                        vous, tu peux accéder à PenPalMap à tout moment, où que
                        tu sois, en toute sécurité.
                    </Text>
                    <br />
                    <Text fontWeight="bold">Avec PenPalMap, vous pouvez :</Text>
                    <ul className="list-inside">
                        <li>
                            Faire des amis du monde entier, quel que soit leur
                            emplacement.
                        </li>
                        <li>Apprendre de nouvelles langues et cultures.</li>
                        <li>
                            Partager vos propres expériences et perspectives.
                        </li>
                        <li>Construire des relations durables.</li>
                    </ul>
                </Box>
            </Flex>
            <Flex
                py={12}
                w={'full'}
                gap={'10'}
                alignItems={'center'}
                flexDir={['column', 'row-reverse']}
            >
                <Box flex={1}>
                    <Image
                        src="/images/image_landing1.png"
                        alt="PenPalMap"
                        width={'100%'}
                        borderRadius={'lg'}
                    />
                </Box>
                <Box flex={1} fontWeight={'medium'} fontSize={'lg'}>
                    <Text fontWeight="bold">
                        PenPalMap vous offre l'occasion d'avoir des vraies
                        amitiés internationales. Connectez-vous avec des
                        personnes de tous les coins du monde et immergez-vous
                        dans des cultures diverses à travers des conversations
                        en ligne. Commencez votre voyage international dès
                        aujourd'hui et rejoignez notre communauté mondiale de
                        correspondants.
                    </Text>
                    <br></br>
                    <Text fontStyle="italic">
                        PenPalMap est la plateforme internationale de
                        correspondance en ligne qui brise les barrières
                        linguistiques et culturelles. Fondée en 2018, notre
                        mission est de rassembler des personnes du monde entier
                        à travers des échanges de messages, favorisant ainsi
                        l'apprentissage interculturel et la compréhension.
                        Découvrez la joie de vous faire des amis du monde entier
                        sans quitter le confort de votre maison.
                    </Text>
                    <br />
                    <Text fontWeight="bold">Fonctionnalités :</Text>
                    <ul>
                        <li>Recherche par pays, langue et intérêts.</li>
                        <li>Messagerie en temps réel.</li>
                        <li>Traduction automatique.</li>
                        <li>Profils détaillés des correspondants.</li>
                        <li>Carte interactive des membres.</li>
                    </ul>
                </Box>
            </Flex>
            <Flex
                py={12}
                w={'full'}
                gap={'10'}
                alignItems={'center'}
                flexDir={['column', 'row']}
            >
                <Box flex={1}>
                    <Image
                        src="/images/image_landing2.png"
                        alt="PenPalMap"
                        width={'100%'}
                        borderRadius={'lg'}
                    />
                </Box>
                <Box flex={1} fontWeight={'medium'} fontSize={['sm', 'lg']}>
                    <Text fontWeight="bold">
                        Explorez PenPalMap, la plateforme internationale de
                        correspondance sans géolocalisation en temps réel.
                        Spécifiez votre ville ou votre pays, mais jamais votre
                        emplacement précis, afin de garantir votre sécurité et
                        votre confidentialité. Sur notre carte interactive et
                        visuellement riche, découvrez la diversité de notre
                        communauté mondiale tout en gardant votre position
                        réelle privée. Explorez, connectez-vous et restez en
                        sécurité avec PenPalMap.
                    </Text>
                    <br></br>
                    <br />
                    <Text fontWeight="bold">Avec PenPalMap, vous pouvez :</Text>
                    <ul>
                        <li>Élargissez vos horizons.</li>
                        <li>Apprenez de nouvelles choses.</li>
                        <li>Faites des amis du monde entier.</li>
                        <li>Améliorez vos compétences linguistiques.</li>
                        <li>Découvrez de nouvelles cultures.</li>
                        <li>Construisez des relations durables.</li>
                    </ul>
                </Box>
            </Flex>
        </Box>
    )
}

export default Presentation
