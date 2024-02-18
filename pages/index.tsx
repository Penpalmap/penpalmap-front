import { Box } from '@chakra-ui/react'
import HeaderLandingPage from '../components/LandingPage/header'
import HeroBannerCard from '../components/LandingPage/heroBannerCard'
import InformationsPart from '../components/LandingPage/informationsPart'
import WhereIsPart from '../components/LandingPage/whereIsPart'
import MapInfoPart from '../components/LandingPage/mapInfoPart'
import TestimonialsPart from '../components/LandingPage/testimonialsPart'
import CallToAction from '../components/LandingPage/callToAction'

export default function Home() {
  return (
    <>
      <Box mx={[4, 32]}>
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
        <Box mx={[4, 32]}>
          <TestimonialsPart />
          <CallToAction />
        </Box>
      </Box>
    </>
  )
}
