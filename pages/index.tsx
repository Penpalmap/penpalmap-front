import { Box } from '@chakra-ui/react'
import HeaderLandingPage from '../components/LandingPage/header'
import HeroBannerCard from '../components/LandingPage/heroBannerCard'
import InformationsPart from '../components/LandingPage/informationsPart'
import WhereIsPart from '../components/LandingPage/whereIsPart'
import MapInfoPart from '../components/LandingPage/mapInfoPart'
import TestimonialsPart from '../components/LandingPage/testimonialsPart'
import CallToAction from '../components/LandingPage/callToAction'
import Footer from '../components/Layout/footer'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
  return (
    <>
      <Box mx={{ base: 4, md: 'auto' }} maxW={'1800px'}>
        <HeaderLandingPage />
        <HeroBannerCard />
        <InformationsPart />
        <MapInfoPart />
        <WhereIsPart />
      </Box>
      <Box
        backgroundImage={'/images/lp/Vector 1.svg'}
        backgroundSize={'cover'}
        pt={44}
      >
        <Box mx={{ base: 4, md: 'auto' }} maxW={'1800px'}>
          <TestimonialsPart />
          <CallToAction />
        </Box>
      </Box>
      <Footer />
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
