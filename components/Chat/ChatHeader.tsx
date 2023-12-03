import {
    Avatar,
    AvatarBadge,
    Box,
    CloseButton,
    Divider,
    Flex,
    Text,
    Link,
    Image,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import NextLink from 'next/link'
import useLocation from '../../hooks/useLocation'
import { useMobileView } from '../../context/MobileViewContext'

type Props = {
    name: string
    photoUrl: string
    userId: string
    isOnline: boolean
}

const ChatHeader = ({ name, photoUrl, userId, isOnline }: Props) => {
    const [appData, setAppData] = useContext(AppContext)

    const { mobileView, setMobileView } = useMobileView()

    const { city, country, flag } = useLocation(
        appData?.userChat?.geom?.coordinates?.[0],
        appData?.userChat?.geom?.coordinates?.[1]
    )

    const onCloseChat = () => {
        if (mobileView === 'chat') {
            setMobileView('conversations')
        }

        setAppData({
            ...appData,
            userChat: null,
            chatOpen: false,
        })
    }

    return (
        <>
            <Flex display={'flex'} alignItems={'center'} py={3} px={4}>
                <Link href={`/?profileId=${userId}`} as={NextLink} passHref>
                    <Avatar name={name} src={photoUrl} width={10} height={10}>
                        <AvatarBadge
                            boxSize="0.9em"
                            bgColor={isOnline ? 'green.500' : 'gray.200'}
                            borderWidth={2}
                        />
                    </Avatar>
                </Link>
                <Link href={`/?profileId=${userId}`} as={NextLink} passHref>
                    <Box ml={4}>
                        <Text
                            fontSize={'lg'}
                            fontWeight={'semibold'}
                            lineHeight={'4'}
                        >
                            {name}
                        </Text>
                        <Flex fontSize={'sm'} alignItems={'center'}>
                            <Text>{city}</Text>
                            {country && city && <Text mr={2}>,</Text>}
                            <Text>{country}</Text>
                            {flag && (
                                <Image
                                    src={flag}
                                    ml={2}
                                    boxSize={'1.5rem'}
                                    alt="flag of country"
                                />
                            )}
                        </Flex>
                    </Box>
                </Link>
                <CloseButton ml={'auto'} onClick={onCloseChat} />
            </Flex>
            <Divider borderColor={'gray.300'} boxShadow={'base'} />
        </>
    )
}

export default ChatHeader
