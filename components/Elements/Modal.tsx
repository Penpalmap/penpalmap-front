import {
    ModalOverlay,
    ModalContent,
    Modal as ChakraModal,
} from '@chakra-ui/react'

export function Modal({ onClose = () => {}, children }) {
    return (
        <ChakraModal
            isOpen={true}
            onClose={onClose}
            size={'3xl'}
            scrollBehavior="inside"
        >
            <ModalOverlay />
            <ModalContent>{children}</ModalContent>
            {/* <ModalOverlay />
            <ModalContent>{children}</ModalContent> */}
        </ChakraModal>
    )
}
