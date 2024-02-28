import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'next-i18next'

const testimonials = [
  {
    name: 'Amélie, 24',
    country: 'France',
    text: "J'avais peur de voyager seule, mais avec Penpalmap, j'ai pu rencontré des locaux avant d'arriver et me sentir vraiment chez moi. Merci Penpalmap!",
    image: '/images/lp/testimonial1.jpg', // Remplacez ceci par le chemin de votre image
  },
  {
    name: 'Paolo, 38',
    country: 'USA',
    text: "Grâce à PenpalMap, j'ai pu établir des connexions incroyables avant même de partir en voyage. C'est comme avoir des amis locaux partout dans le monde. J'ai appris des phrases en japonais et des astuces pour mon voyage à Tokyo!",
    image: '/images/lp/testimonial2.jpg', // Remplacez ceci par le chemin de votre image
  },
  {
    name: 'Elena, 21',
    country: 'Japan',
    text: "PenpalMap a changé ma façon de voir les voyages. Rencontrer des gens du coin avant d'arriver m'aide à planifier mon voyage et à éviter les pièges à touristes. C'est un outil indispensable pour tout voyageur",
    image: '/images/lp/testimonial3.jpg', // Remplacez ceci par le chemin de votre image
  },
]

const Testimonial = ({ name, text, image, country }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      py={'8'}
      px={12}
      bg="white"
      boxShadow={'lg'}
      w={['full', '30%']}
    >
      <Flex mb={5} alignItems={'center'}>
        <Box w={'20'} mr={6}>
          <Image borderRadius="full" w={'full'} src={image} alt="testimonial" />
        </Box>

        <Box>
          <Text fontWeight="bold" fontSize={'xl'}>
            {name}
          </Text>
          <Text color={'gray.500'}>{country}</Text>
        </Box>
      </Flex>
      <Box>
        <Text fontSize={'lg'} fontStyle={'italic'}>
          <span style={{ marginRight: 5 }}>
            <FontAwesomeIcon icon={faQuoteLeft} color="#919191" size="xs" />
          </span>
          {text}
          <span style={{ marginLeft: 8 }}>
            <FontAwesomeIcon icon={faQuoteRight} color="#919191" size="xs" />
          </span>
        </Text>
      </Box>
    </Box>
  )
}

const TestimonialsPart = () => {
  const { t } = useTranslation('common')
  return (
    <Box mb={40}>
      <Text fontSize={'4xl'} textAlign={'center'} fontWeight={'bold'} mb={20}>
        {t('presentation.whatOurOthersSay')}
      </Text>
      <Flex flexWrap={'wrap'} justifyContent={'space-between'} gap={4}>
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </Flex>
    </Box>
  )
}

export default TestimonialsPart
