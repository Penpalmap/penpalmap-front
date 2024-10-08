import { Box, Heading, Text, List, ListItem, Link } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

export default function TermsOfUse() {
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{t('title.terms.index')}</title>
      </Head>
      <Box maxW="800px" mx="auto" py="6" px="4">
        <Heading mb="5" as="h1" size="lg">
          Terms of Use
        </Heading>

        <Heading mb="2" as="h2" size="md">
          Generalities
        </Heading>
        <Text mb="3">
          MeetMapper provides a platform enabling individuals from all over the
          world to connect and communicate. We value and uphold your privacy,
          ensuring you can interact with other members on our platform. By
          posting or uploading content potentially protected by intellectual
          property rights, you expressly grant us a non-exclusive, transferable,
          sublicensable, free, global, perpetual license to use this content.
        </Text>

        <Heading mb="2" as="h2" size="md">
          Photo Usage
        </Heading>
        <List spacing={2}>
          <ListItem>
            Photo Upload: As a MeetMapper user, you&apos;re allowed to upload
            personal photos to complete your profile. These photos can be
            centered on a specific part of the image according to your choice,
            and you can upload several to display on your profile.
          </ListItem>
          <ListItem>
            Photo Ownership: As a user, you certify that you hold all necessary
            rights for photos you upload to MeetMapper.
          </ListItem>
          <ListItem>
            Photo License: When uploading a photo, you grant MeetMapper a
            non-exclusive, transferable, sublicensable, free, worldwide license
            to use, reproduce, distribute, and display this photo in relation to
            MeetMapper&apos;s services.
          </ListItem>
          <ListItem>
            Prohibition of Scraping: It&apos;s strictly forbidden to scrape or
            download photos of other MeetMapper users without their explicit
            consent.
          </ListItem>
          <ListItem>
            Photo Protection: We&apos;re committed to safeguarding your photos
            on our servers. Though, the transmission of data over the internet
            is not always entirely secure.
          </ListItem>
          <ListItem>
            Privacy Respect: Photos of others were taken with explicit consent.
            If the photo was taken in a private place, you obtained the
            owner&apos;s consent.
          </ListItem>
          <ListItem>
            Inappropriate Content: Photos that are obscene, pornographic,
            defamatory, threatening, violent, hateful, racist, or otherwise
            offensive are not allowed.
          </ListItem>
        </List>

        <Heading mb="2" as="h2" size="md">
          Accounts
        </Heading>
        <Text mb="3">
          You can register as a member of the MeetMapper community. Follow the
          respective instructions during registration. An user account can be
          created with a personal email address.
        </Text>

        <Heading mb="2" as="h2" size="md">
          Termination
        </Heading>
        <Text mb="3">
          MeetMapper may terminate your access to all or part of the MeetMapper
          services at any time, with or without reason, with or without notice,
          effective immediately. If you wish to terminate this agreement or your
          account, you can delete your account from your account profile
          settings.
        </Text>

        <Heading mb="2" as="h2" size="md">
          Liability
        </Heading>
        <Text mb="3">
          The website and mobile applications are provided &quot;as is&quot;.
          MeetMapper disclaims all responsibility for the accuracy, quality,
          completeness, reliability, or credibility of the content.
        </Text>

        <Heading mb="2" as="h2" size="md">
          Privacy
        </Heading>
        <Text mb="3">
          MeetMapper gives top priority to user information protection.
        </Text>

        <Heading mb="2" as="h2" size="md">
          Modifications
        </Heading>
        <Text mb="3">
          MeetMapper reserves the right to change the terms of use with
          appropriate notice of at least six weeks.
        </Text>

        <Box mt="5">
          <Link href="/privacy-policy" color="blue.500">
            For more details, refer to MeetMapper&quot;s Privacy Policy.
          </Link>
        </Box>
      </Box>
    </>
  )
}
