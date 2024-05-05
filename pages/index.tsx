import { Box } from '@chakra-ui/react'
import HeroBannerCard from '../components/LandingPage/heroBannerCard'
import InformationsPart from '../components/LandingPage/informationsPart'
import MapInfoPart from '../components/LandingPage/mapInfoPart'
import TestimonialsPart from '../components/LandingPage/testimonialsPart'
import CallToAction from '../components/LandingPage/callToAction'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMobileView } from '../context/MobileViewContext'
import Header from '../components/Layout/header'
import { useSession } from '../hooks/useSession'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const { isMobile } = useMobileView()

  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home')
    }
  }, [router, status])

  return (
    <>
      <Box h={'4rem'}>
        <Header />
      </Box>
      <Box>
        <HeroBannerCard isMobile={isMobile} />
        <InformationsPart />
        <MapInfoPart />
        {/* <WhereIsPart /> */}
      </Box>
      <Box
        backgroundImage={'/images/lp/Vector 1.svg'}
        backgroundSize={'cover'}
        pt={{ base: 20, md: 40 }}
      >
        <Box>
          <TestimonialsPart />
          <CallToAction />
        </Box>
      </Box>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
