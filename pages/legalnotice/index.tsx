import { Box, Heading, Text } from '@chakra-ui/react'

const LegalNotice = () => {
    return (
        <Box maxW="800px" mx="auto" py="6" px="4">
            <Heading mb="5" as="h1" size="lg">
                Legal Notice
            </Heading>

            <Text mb="3">
                Penpalmap.com
                <br />
                Email: contact@penpalmap.com
                <br />
                The domain name www.penpalmap.com was established on September
                15, 2018.
            </Text>

            <Heading mb="2" as="h2" size="md">
                DISCLAIMER
            </Heading>
            <Text mb="3">
                The content of the site www.penpalmap.com has been prepared with
                the utmost care. However, we cannot provide any guarantees
                regarding the completeness, accuracy, or timeliness of the
                website&rsquo;s content. We are responsible for our own
                information in accordance with general legislation. This does
                not affect the obligation to block or prevent the use of
                information under general laws. However, liability is only
                possible once we become aware of a specific legal violation. In
                this case, we will promptly remove the affected content.
            </Text>

            <Heading mb="2" as="h2" size="md">
                LIABILITY FOR LINKS
            </Heading>
            <Text mb="3">
                This website may contain links to external third-party websites
                over which we have no control. We therefore cannot provide any
                guarantees for this external content. The respective operators
                and providers bear sole responsibility for the content of these
                external websites. However, at the time of linking, we checked
                the linked website for any potential legal violations. No such
                violations were identifiable when the link was established.
                Nevertheless, regular reviews of the content of linked websites
                without specific indications of a legal violation are not
                feasible. If we become aware of legal violations, we will
                immediately remove links to any illegal content.
            </Text>

            <Heading mb="2" as="h2" size="md">
                COPYRIGHT
            </Heading>
            <Text mb="3">
                The content and works we&apos;ve created on these pages are
                subject to French and European copyright laws. We highlight that
                any duplication, processing, distribution, or any form beyond
                the scope of copyright law requires the written
                consentrespective author or creator. Without explicit and
                writtenwritten consent from the author, any further use, any
                furtherany further use, especially publication and any form of
                commercial exploitation, is prohibited. The copyright for
                published material here and objects created by the author solely
                belongs to the operator of these pages.
            </Text>

            <Text mb="3" fontWeight="bold">
                COPYRIGHT @ PENPALMAP SAS.
            </Text>

            <Text mb="3">
                Copies, potential downloads from the site, and applications are
                only permitted for private, non-commercial use. Insofar as the
                content on this site was not created by the operator,
                third-party copyrights are respected. Additionally, such
                material, especially third-party material, is identified as
                such. Nevertheless, if you notice any copyright infringements,
                we request that you inform us accordingly. Upon becoming aware
                of legal violations, we will immediately remove the affected
                content.
            </Text>
        </Box>
    )
}

export default LegalNotice
