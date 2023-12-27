import { useRouter } from 'next/router'
import Profile from '../../components/Profile'
import { Box, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPaths } from 'next'

export default function ProfilePage() {
    const router = useRouter()
    const { profileId } = router.query as { profileId: string }

    return (
        <Box
            bg={'gray.100'}
            py={12}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
        >
            <Box mx={36} pb={6} w="3xl" m={'auto'}>
                <Button
                    leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                    variant={'ghost'}
                    onClick={() => router.push('/')}
                >
                    Back
                </Button>
            </Box>
            <Box
                mx={36}
                bg={'white'}
                boxShadow="lg"
                borderRadius="md"
                shadow={'xl'}
                w="3xl"
                margin={'auto'}
            >
                <Box>
                    <Profile profileId={profileId} />
                </Box>
            </Box>
        </Box>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    }
}
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}
