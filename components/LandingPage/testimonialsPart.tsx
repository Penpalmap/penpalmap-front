import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

const testimonials = [
  {
    name: 'Michel, 16',
    text: 'Very cool app! And it is very secure, i love Penpalmap 🎉 Tellement de personnes à rencontrer',
    image: '/images/lp/testimonial1.jpg', // Remplacez ceci par le chemin de votre image
  },
  {
    name: 'Michel, 16',
    text: 'Very cool app! And it is very secure, i love Penpalmap 🎉 Tellement de personnes à rencontrer',
    image: '/images/lp/testimonial1.jpg', // Remplacez ceci par le chemin de votre image
  },
  {
    name: 'Michel, 16',
    text: 'Very cool app! And it is very secure, i love Penpalmap 🎉 Tellement de personnes à rencontrer',
    image: '/images/lp/testimonial1.jpg', // Remplacez ceci par le chemin de votre image
  },
]

const Testimonial = ({ name, text, image }) => {
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
        <Text fontWeight="bold" fontSize={'xl'}>
          {name}
        </Text>
      </Flex>
      <Text fontSize={'lg'} fontStyle={'italic'}>
        {text}
      </Text>
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
