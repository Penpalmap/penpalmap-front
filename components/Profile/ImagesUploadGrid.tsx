import React, { useMemo, useRef } from 'react'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { DndContext } from '@dnd-kit/core'
import SortableItem from './SortableItem'
import { Flex, Grid, Image, Input } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { reorderProfileImages } from '../../api/profileApi'

type Props = {
    images: File[]
    setImages: React.Dispatch<React.SetStateAction<File[]>>
    handleUploadImage: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => Promise<void>
}

const ImagesUploadGrid = ({ images, setImages, handleUploadImage }: Props) => {
    const refInputFile = useRef<HTMLInputElement>(null)
    const { data: session } = useSession()

    const handleDragEnd = async (event) => {
        if (!session?.user?.id) return
        const { active, over } = event

        if (!over) {
            return
        }

        if (active.id !== over.id) {
            let oldIndex
            let newIndex

            setImages((images) => {
                const oldFile = images.find((image) => image.name === active.id)
                if (oldFile) {
                    oldIndex = images.indexOf(oldFile)
                }

                const newFile = images.find((image) => image.name === over.id)
                if (newFile) {
                    newIndex = images.indexOf(newFile)
                }

                return arrayMove(images, oldIndex, newIndex)
            })

            await reorderProfileImages(session?.user?.id, oldIndex, newIndex)
        }
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
                    border={'1px solid black'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    cursor={'pointer'}
                    onClick={handleAddImage}
                >
                    +
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
                <SortableContext items={images.map((image) => image.name)}>
                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        p={4}
                        gap={4}
                        justifyItems={'center'}
                    >
                        {images.map((image) => (
                            <SortableItem key={image.name} id={image.name}>
                                <Image
                                    src={URL.createObjectURL(image)}
                                    w={'200px'}
                                    h={'200px'}
                                    borderRadius={'lg'}
                                />
                            </SortableItem>
                        ))}
                        {renderBlockInput}
                    </Grid>
                </SortableContext>
            </DndContext>
        </>
    )
}

export default ImagesUploadGrid
