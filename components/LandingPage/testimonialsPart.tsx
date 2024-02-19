import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'

const testimonials = [
  {
    name: 'Amélie, 24',
    country: 'France',
    text: "J'avais peur de voyager seule, mais avec Penpalmap, j'ai pu rencontré des locaux avant d'arriver et me sentir vraiment chez moi. Merci Penpalmap! 🌍",
    image: '/images/lp/testimonial1.jpg', // Remplacez ceci par le chemin de votre image
  },
  {
    name: 'Paolo, 38',
    country: 'USA',
    text: 'Very cool app! And it is very secure, i love Penpalmap 🎉 Tellement de personnes à rencontrer',
    image: '/images/lp/testimonial1.jpg', // Remplacez ceci par le chemin de votre image
  },
  {
    name: 'Elena, 21',
    country: 'Japan',
    text: 'Very cool app! And it is very secure, i love Penpalmap 🎉 Tellement de personnes à rencontrer',
    image: '/images/lp/testimonial1.jpg', // Remplacez ceci par le chemin de votre image
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
  return (
    <Box mb={40}>
      <Text fontSize={'4xl'} textAlign={'center'} fontWeight={'bold'} mb={20}>
        What our users say
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
