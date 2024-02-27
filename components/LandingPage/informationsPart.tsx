import { Flex, Text } from '@chakra-ui/react'

const InformationBlock = ({ title, description, emoji }) => {
  return (
    <Flex textAlign={'center'} flexDir={'column'} alignItems={'center'} gap={4} m={5}>
      <Flex
        borderRadius={'full'}
        background={'gray.200'}
        w={20}
        h={20}
        alignItems={'center'}
      >
        <Text fontSize={'4xl'} m={'auto'}>
          {emoji}
        </Text>
      </Flex>
      <Text fontSize={'2xl'} fontWeight={'bold'}>
        {title}
      </Text>
      <Text fontSize={'lg'}>{description}</Text>
    </Flex>
  )
}

const InformationsPart = () => {
  return (
    <Flex
      direction={['column', 'row']}
      justifyContent={'space-around'}
      mb={20}
      id="informationsPart"
    >
      <InformationBlock
        title={'Around the world'}
        description={
          'Grâce à PenPalMap, découvrez des personnes du monde entier et élargissez vos horizons en établissant des correspondances internationales uniques.'
        }
        emoji={'🌍'}
      />
      <InformationBlock
        title={'Travel and go'}
        description={
          'Lors de vos voyages, PenPalMap vous met en contact avec des habitants locaux, vous offrant ainsi une expérience de voyage enrichissante et authentique.'
        }
        emoji={'✈️'}
      />
      <InformationBlock
        title={'Secure app'}
        description={
          "PenPalMap garantit la sécurité de vos données et de vos communications, vous permettant de vous connecter en toute tranquillité d'esprit avec une communauté mondiale diversifiée."
        }
        emoji={'🛡️'}
      />
      <InformationBlock
        title={'Beautiful community'}
        description={
          "Faites partie d'une communauté chaleureuse et bienveillante sur PenPalMap, où vous pouvez échanger des idées, partager des expériences et créer des amitiés durables à travers le monde."
        }
        emoji={'😉'}
      />
    </Flex>
  )
}

export default InformationsPart
