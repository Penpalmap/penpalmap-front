import { Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const InformationBlock = ({ title, description, emoji }) => {
  return (
    <Flex textAlign={'center'} flexDir={'column'} alignItems={'center'} gap={4}>
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
  const { t } = useTranslation('common')

  return (
    <Flex
      direction={['column', 'row']}
      justifyContent={'space-around'}
      display={'flex'}
      gap={[10, 32]}
      mb={20}
      id="informationsPart"
    >
      <InformationBlock
        title={t('presentation.aroundTheWorld')}
        description={t('presentation.aroundTheWorldText')}
        emoji={'🌍'}
      />
      <InformationBlock
        title={t('presentation.travelAndMeet')}
        description={t('presentation.travelAndMeetText')}
        emoji={'✈️'}
      />
      <InformationBlock
        title={t('presentation.secureApp')}
        description={t('presentation.secureAppText')}
        emoji={'🛡️'}
      />
      <InformationBlock
        title={t('presentation.beautifulCommunity')}
        description={t('presentation.beautifulCommunityText')}
        emoji={'😉'}
      />
    </Flex>
  )
}

export default InformationsPart
