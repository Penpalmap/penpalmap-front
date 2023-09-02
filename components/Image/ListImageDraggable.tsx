import { Box, Flex, IconButton, Image } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef } from 'react'
import Sortable from 'sortablejs'
import { UserImage } from '../../types'
import { useSession } from 'next-auth/react'
import { reorderProfileImages } from '../../api/profileApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faMapMarker } from '@fortawesome/free-solid-svg-icons'

type Props = {
    photos: UserImage[]
    handleDeleteImage: (position: number) => void
    handleAddImage: () => void
}

const ListImageDraggable = ({
    photos,
    handleDeleteImage,
    handleAddImage,
}: Props) => {
    const gridRef = useRef<any>(null)
    const sortableJsRef = useRef<any>(null)
    const { data: session, update: updateSession } = useSession()

    // const [data, setData] = useState(photos)

    const emptyPhotosCount = 4 - photos.length

    const onListChange = useCallback(
        async (evt) => {
            if (!session) return
            if (!gridRef.current) return

            const newPhotos = [...photos]
            const newOrder = sortableJsRef.current.toArray()

            newPhotos.forEach((photo) => {
                const newPosition = newOrder.indexOf(photo.position.toString())
                photo.position = newPosition
            })

            await reorderProfileImages(
                session.user.id,
                evt.oldIndex,
                evt.newIndex
            )

            updateSession({
                ...session,
                user: {
                    ...session.user,
                    userImages: newPhotos,
                },
            })
        },
        [photos, session, updateSession]
    )

    useEffect(() => {
        if (!gridRef.current) return

        sortableJsRef.current = new Sortable(gridRef.current, {
            animation: 150,
            onEnd: onListChange,
            filter: '.empty-box', // Exclude elements with the "empty-box" class from dragging
        })
    }, [onListChange])

    return (
        <Flex
            ref={gridRef}
            flexWrap="wrap"
            gap={3}
            justifyContent="space-between"
            mb={4}
        >
            {[...Array(session?.user?.userImages.length)].map((_, index) => {
                const image = session?.user?.userImages?.find(
                    (img: UserImage) => img.position === index
                )

                console.log('image', image)
                return (
                    <Box
                        key={image?.position}
                        data-id={image?.position}
                        w={170}
                        h={170}
                        display={'inline-block'}
                        position="relative"
                        className="draggable"
                    >
                        <Image
                            src={image?.src}
                            borderRadius={8}
                            alt="profile image"
                        />
                        <IconButton
                            onClick={() =>
                                image?.position &&
                                handleDeleteImage(image?.position)
                            }
                            position={'absolute'}
                            bottom={2}
                            right={2}
                            aria-label="Send email"
                            bg={'blackAlpha.400'}
                            border={'2px solid white'}
                            icon={
                                <FontAwesomeIcon icon={faClose} color="white" />
                            }
                        />
                    </Box>
                )
            })}

            {emptyPhotosCount > 0 &&
                [...Array(emptyPhotosCount)].map((_, index) => (
                    <Flex
                        data-id="empty"
                        key={index}
                        position="relative"
                        className="empty-box" // Add a specific class for empty boxes
                        w={170}
                        h={170}
                        bgColor="red.100"
                        borderRadius="xl"
                        justifyContent="center"
                        alignItems="center"
                        cursor="pointer"
                        onClick={() => handleAddImage()}
                    >
                        <FontAwesomeIcon icon={faMapMarker} />
                    </Flex>
                ))}
        </Flex>
    )
}

export default ListImageDraggable
