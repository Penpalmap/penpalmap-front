import React, { useMemo, useRef } from 'react'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { DndContext } from '@dnd-kit/core'
import SortableItem from './SortableItem'
import { Box, Button, Center, Flex, Grid, Image, Input } from '@chakra-ui/react'
import { useSession } from './../../hooks/useSession'
import { reorderProfileImages } from '../../api/profileApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { UserImage } from '../../types'

type Props = {
    images: UserImage[]
    setImages: React.Dispatch<React.SetStateAction<UserImage[]>>
    handleUploadImage: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => Promise<void>
    handleDeleteImage: (index: number) => void
}

const ImagesUploadGrid = ({
    images,
    setImages,
    handleUploadImage,
    handleDeleteImage,
}: Props) => {
    const refInputFile = useRef<HTMLInputElement>(null)
    const { session } = useSession()
    // const { data: session, update: updateSession } = useSession()

    const items = useMemo(() => {
        return images.map((image) => image.src)
    }, [images])

    const handleDragEnd = async (event) => {
        if (!session?.user?.id) return
        const { active, over } = event

        if (!over) {
            return
        }

        if (active.id !== over.id) {
            let oldIndex
            let newIndex
            const oldFile = images.find((image) => image.src === active.id)
            if (oldFile) {
                oldIndex = images.indexOf(oldFile)
            }

            const newFile = images.find((image) => image.src === over.id)
            if (newFile) {
                newIndex = images.indexOf(newFile)
            }

            if (!oldFile || !newFile) return images
            oldFile.position = newIndex
            newFile.position = oldIndex

            const newImagesOrder = arrayMove(images, oldIndex, newIndex)

            newImagesOrder.forEach((image, index) => {
                image.position = index
            })

            setImages(newImagesOrder)
            await reorderProfileImages(session?.user?.id, newImagesOrder)

            updateSession()
        }

        return
    }

    const handleAddImage = () => {
        if (refInputFile.current) {
            refInputFile.current.click()
        }
    }

    const renderBlockInput = useMemo(() => {
        const numberEmptyImages = 4 - images.length

        const blockInput: JSX.Element[] = [] // Explicitly type the array as an array of JSX.Element elements
        for (let i = 0; i < numberEmptyImages; i++) {
            blockInput.push(
                <Flex
                    key={i} // Add a unique key prop to each element
                    w={'200px'}
                    h={'200px'}
                    bg={'gray.100'}
                    borderRadius={'lg'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    cursor={'pointer'}
                    onClick={handleAddImage}
                    position={'relative'}
                >
                    <Flex
                        position={'absolute'}
                        bottom={4}
                        right={4}
                        background={'teal.400'}
                        padding={2}
                        w={'30px'}
                        h={'30px'}
                        borderRadius={'md'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        _hover={{ background: 'teal.500' }}
                    >
                        <FontAwesomeIcon icon={faPlus} color="white" />
                    </Flex>
                </Flex>
            )
        }

        return blockInput
    }, [images])

    return (
        <>
            <Input
                type="file"
                ref={refInputFile}
                display="none"
                onChange={handleUploadImage}
            />
            <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={items}>
                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gap={4}
                        p={4}
                        justifyContent={'center'}
                    >
                        {images.map((image) => (
                            <Box position={'relative'} key={image.src}>
                                <SortableItem key={image.src} id={image.src}>
                                    <Box position={'relative'}>
                                        <Image
                                            src={
                                                image instanceof File
                                                    ? URL.createObjectURL(image)
                                                    : image.src
                                            }
                                            w={'200px'}
                                            h={'200px'}
                                            borderRadius={'lg'}
                                            alt="Profile Image"
                                        />
                                    </Box>
                                </SortableItem>
                                <Button
                                    size={'sm'}
                                    colorScheme={'red'}
                                    position={'absolute'}
                                    bottom={2}
                                    right={2}
                                    onClick={() => {
                                        handleDeleteImage(
                                            items.indexOf(image.src)
                                        )
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                                {image.position === 0 && (
                                    <Center
                                        position={'absolute'}
                                        top={2}
                                        left={2}
                                        background={'blackAlpha.500'}
                                        padding={2}
                                        borderRadius={'md'}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCrown}
                                            color="#ECC94B"
                                        />
                                    </Center>
                                )}
                            </Box>
                        ))}
                        {renderBlockInput}
                    </Grid>
                </SortableContext>
            </DndContext>
        </>
    )
}

export default ImagesUploadGrid
