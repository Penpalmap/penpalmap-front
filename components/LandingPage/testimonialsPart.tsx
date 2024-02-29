import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'

const testimonials = [
  {
    name: 'Amélie, 24',
    country: 'France',
    text: 'I was afraid to travel alone, but with Penpalmap, I was able to meet locals before arriving and truly feel at home. Thank you Penpalmap!',
    image: '/images/lp/user1_PENPALMAP.webp',
  },
  {
    name: 'Paolo, 38',
    country: 'USA',
    text: "Thanks to PenpalMap, I was able to establish incredible connections even before embarking on my journey. It's like having local friends all over the world. I learned Japanese phrases and tips for my trip to Tokyo!",
    image: '/images/lp/user2_PENPALMAP.webp',
  },
  {
    name: 'Elena, 21',
    country: 'Japan',
    text: "PenpalMap has changed my way of seeing travel. Meeting locals before arriving helps me plan my trip and avoid tourist traps. It's an essential tool for any traveler.",
    image: '/images/lp/user3_PENPALMAP.webp',
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
