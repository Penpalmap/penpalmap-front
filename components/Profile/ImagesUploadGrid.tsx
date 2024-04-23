import React, { useMemo, useRef } from 'react'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import SortableItem from './SortableItem'
import { Box, Button, Center, Flex, Grid, Image, Input } from '@chakra-ui/react'
import { useSession } from './../../hooks/useSession'
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
  const { user } = useSession()

  const items = useMemo(() => {
    return images.map((image) => image.src)
  }, [images])

  const handleDragEnd = (event: DragEndEvent): void => {
    if (!user) return
    const { active, over } = event

    if (!over) {
      return
    }

    if (active.id !== over.id) {
      let oldIndex
      let newIndex
      const oldFile = images.find((image) => image.src === active.id)
      const newFile = images.find((image) => image.src === over.id)

      if (oldFile && newFile) {
        oldIndex = images.indexOf(oldFile)
        newIndex = images.indexOf(newFile)
        oldFile.position = newIndex
        newFile.position = oldIndex

        const newImagesOrder = arrayMove(images, oldIndex, newIndex)

        newImagesOrder.forEach((image, index) => {
          image.position = index + 1
        })

        setImages(newImagesOrder)

        // TO DO
        // await reorderProfileImages(user.id, newImagesOrder)

        // updateSession()
      }
    }
  }

  const handleAddImage = () => {
    if (refInputFile.current) {
      refInputFile.current.click()
    }
  }

  const renderBlockInput = useMemo(() => {
    const numberEmptyImages = 4 - images.length

    const blockInput: JSX.Element[] = []
    for (let i = 0; i < numberEmptyImages; i++) {
      blockInput.push(
        <Flex
          w={{
            base: '150px',
            sm: '180px',
            md: '200px',
            lg: '250px',
            xl: '300px',
          }}
          h={{
            base: '150px',
            sm: '180px',
            md: '200px',
            lg: '250px',
            xl: '300px',
          }}
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
            bottom={2}
            right={2}
            bg={'teal.400'}
            p={2}
            w={{ base: '20px', sm: '25px', md: '30px', lg: '35px', xl: '40px' }}
            h={{ base: '20px', sm: '25px', md: '30px', lg: '35px', xl: '40px' }}
            borderRadius={'md'}
            justifyContent={'center'}
            alignItems={'center'}
            _hover={{ bg: 'teal.500' }}
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
                    handleDeleteImage(items.indexOf(image.src))
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
                    <FontAwesomeIcon icon={faCrown} color="#ECC94B" />
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
