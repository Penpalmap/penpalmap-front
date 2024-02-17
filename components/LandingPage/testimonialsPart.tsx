import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const testimonials = [
  {
    name: 'Michel, 16',
    text: 'Very cool app! And it is very secure, i love Penpalmap 🎉 Tellement de personnes à rencontrer',
    image: '/path/to/image-1.jpg', // Remplacez ceci par le chemin de votre image
  },
  {
    name: 'Michel, 16',
    text: 'Very cool app! And it is very secure, i love Penpalmap 🎉 Tellement de personnes à rencontrer',
    image: '/path/to/image-1.jpg', // Remplacez ceci par le chemin de votre image
  },
  {
    name: 'Michel, 16',
    text: 'Very cool app! And it is very secure, i love Penpalmap 🎉 Tellement de personnes à rencontrer',
    image: '/path/to/image-1.jpg', // Remplacez ceci par le chemin de votre image
  },
  {
    name: 'Michel, 16',
    text: 'Very cool app! And it is very secure, i love Penpalmap 🎉 Tellement de personnes à rencontrer',
    image: '/path/to/image-1.jpg', // Remplacez ceci par le chemin de votre image
  },
  {
    name: 'Michel, 16',
    text: 'Very cool app! And it is very secure, i love Penpalmap 🎉 Tellement de personnes à rencontrer',
    image: '/path/to/image-1.jpg', // Remplacez ceci par le chemin de votre image
  },
  // ... Ajoutez d'autres témoignages ici
]

const arrowStyles = {
  position: 'absolute',
  zIndex: 2,
  top: 'calc(50% - 15px)',
  width: 30,
  height: 30,
  cursor: 'pointer',
}

const Testimanial = ({ name, text, image }) => {
  return (
    <VStack
      mx={'40'}
      maxW="full"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      align="center"
      bg="white"
      spacing={4}
    >
      <Image src={image} alt={name} />
      <Text fontWeight="bold">{name}</Text>
      <Text fontSize="sm">{text}</Text>
    </VStack>
  )
}

const TestimonialCarousel = () => {
  return (
    <Carousel
      width={'100%'}
      centerMode={true}
      centerSlidePercentage={40.33333}
      showThumbs={false}
      showStatus={false}
      interval={1000}
      infiniteLoop={true}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <Box {...arrowStyles} left={10} onClick={onClickHandler}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Box>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <Box {...arrowStyles} right={10} onClick={onClickHandler}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Box>
        )
      }
    >
      {testimonials.map((testimonial, index) => (
        <Testimanial key={index} {...testimonial} />
      ))}
    </Carousel>
  )
}

export default TestimonialCarousel
